// /app/components/userPage/LikedUserModal.jsx

"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { FiMessageCircle } from "react-icons/fi";
import { io } from "socket.io-client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LikedUserModal = ({ open, handleClose, likedBy, loggedInUserId }) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp
        open={open}
        handleClose={handleClose}
        likedBy={likedBy}
        loggedInUserId={loggedInUserId}
      />
    </SnackbarProvider>
  );
};

function MyApp({ open, handleClose, likedBy, loggedInUserId }) {
  const { enqueueSnackbar } = useSnackbar();
  const [filteredLikedBy, setFilteredLikedBy] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    setFilteredLikedBy(likedBy.filter((user) => user._id !== loggedInUserId));

    // WebSocket connection
    socket.current = io();

    socket.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    return () => {
      socket.current.disconnect();
    };
  }, [likedBy, loggedInUserId]);

  const handleAction = async (userId, actionType) => {
    try {
      let endpoint = "";
      let successMessage = "";

      switch (actionType) {
        case "addFriend":
          endpoint = "/api/username/add-friends";
          successMessage = "Friend added successfully.";
          break;
        case "acceptRequest":
          endpoint = "/api/username/accept-friends";
          successMessage = "Friend request accepted successfully.";
          break;
        case "cancelRequest":
          endpoint = "/api/username/cancel-friends";
          successMessage = "Friend request canceled successfully.";
          break;
        default:
          return;
      }

      const response = await axios.post(endpoint, {
        userId,
        loggedInUserId,
      });

      // console.log(response.data);

      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: "success" });

        // Emit WebSocket event for friend request actions
        socket.current.emit("sendFriendRequest");

        // Update the filteredLikedBy state with the updated user object
        const updatedLikedBy = filteredLikedBy.map((user) =>
          user._id === userId ? response.data.updatedUser : user
        );
        setFilteredLikedBy(updatedLikedBy);
      }
    } catch (error) {
      // console.log(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  // console.log("filteredLikedBy", filteredLikedBy)

  return (
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box
    //     sx={style}
    //     className="rounded-md shadow-sm border-none w-[400px] md:w-[600px]"
    //   >
    //     <Typography variant="h6" component="h2" className="text-[12px]">
    //       Users Who Liked This Post
    //     </Typography>
    //     <hr />
    //     <div className="flex flex-wrap flex-col py-2 gap-2">
    //       {filteredLikedBy.length > 0 ? (
    //         filteredLikedBy.map((user) => (
    //           <div className="flex justify-between" key={user._id}>
    //             <div className="flex items-center">
    //               <div className="relative w-10 h-10 mr-2">
    //                 <Image
    //                   src={user.profilePicture || avatar}
    //                   alt="Profile Picture"
    //                    fill
    // style={{ objectFit: "cover" }}
    //                   className="rounded-full"
    //                 />
    //               </div>
    //               <div className="text-[12px] fw-bold">
    //                 {user.firstName} {user.lastName}
    //               </div>
    //             </div>
    //             {user.currentFriends.includes(loggedInUserId) ? (
    //               <button
    //                 className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
    //                 onClick={() => handleAction(user._id, "sendMessage")}
    //               >
    //                 <FiMessageCircle className="my-auto" />{" "}
    //                 <span className="my-auto">Message</span>
    //               </button>
    //             ) : user.outgoingFriendRequests.includes(loggedInUserId) ? (
    //               <button
    //                 className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
    //                 onClick={() => handleAction(user._id, "acceptRequest")}
    //               >
    //                 <FaUserCheck className="my-auto" />{" "}
    //                 <span className="my-auto">Accept Request</span>
    //               </button>
    //             ) : user.incomingFriendRequests.includes(loggedInUserId) ? (
    //               <button
    //                 className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
    //                 onClick={() => handleAction(user._id, "cancelRequest")}
    //               >
    //                 <FaUserCheck className="my-auto" />{" "}
    //                 <span className="my-auto">Cancel Request</span>
    //               </button>
    //             ) : (
    //               <button
    //                 className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
    //                 onClick={() => handleAction(user._id, "addFriend")}
    //               >
    //                 <FaUserPlus className="my-auto" />{" "}
    //                 <span className="my-auto">Add Friend</span>
    //               </button>
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <Typography key="empty" variant="body2">
    //           No users liked this post.
    //         </Typography>
    //       )}
    //     </div>
    //   </Box>
    // </Modal>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className={`rounded-md shadow-sm border-none w-[400px] md:w-[600px] dark:bg-gray-800 dark:text-white bg-white text-black`}
      >
        <Typography variant="h6" component="h2" className="text-[12px]">
          Users Who Liked This Post
        </Typography>
        <hr />
        <div className="flex flex-wrap flex-col py-2 gap-2">
          {filteredLikedBy.length > 0 ? (
            filteredLikedBy.map((user) => (
              <div className="flex justify-between" key={user._id}>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-2">
                    <Image
                      src={user.profilePicture || avatar}
                      alt="Profile Picture"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-[12px] font-bold">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
                {user.currentFriends.includes(loggedInUserId) ? (
                  <button
                    className={`cursor-pointer py-0 px-2 rounded-lg text-[14px] flex gap-1 dark:bg-gray-600 dark:hover:bg-gray-500 bg-gray-300 hover:bg-gray-400`}
                    onClick={() => handleAction(user._id, "sendMessage")}
                  >
                    <FiMessageCircle className="my-auto" />{" "}
                    <span className="my-auto">Message</span>
                  </button>
                ) : user.outgoingFriendRequests.includes(loggedInUserId) ? (
                  <button
                    className={`cursor-pointer py-0 px-2 rounded-lg text-[14px] flex gap-1 dark:bg-gray-600 dark:hover:bg-gray-500 bg-gray-300 hover:bg-gray-400`}
                    onClick={() => handleAction(user._id, "acceptRequest")}
                  >
                    <FaUserCheck className="my-auto" />{" "}
                    <span className="my-auto">Accept Request</span>
                  </button>
                ) : user.incomingFriendRequests.includes(loggedInUserId) ? (
                  <button
                    className={`cursor-pointer py-0 px-2 rounded-lg text-[14px] flex gap-1 dark:bg-gray-600 dark:hover:bg-gray-500 bg-gray-300 hover:bg-gray-400`}
                    onClick={() => handleAction(user._id, "cancelRequest")}
                  >
                    <FaUserCheck className="my-auto" />{" "}
                    <span className="my-auto">Cancel Request</span>
                  </button>
                ) : (
                  <button
                    className={`cursor-pointer py-0 px-2 rounded-lg text-[14px] flex gap-1 dark:bg-gray-600 dark:hover:bg-gray-500 bg-gray-300 hover:bg-gray-400`}
                    onClick={() => handleAction(user._id, "addFriend")}
                  >
                    <FaUserPlus className="my-auto" />{" "}
                    <span className="my-auto">Add Friend</span>
                  </button>
                )}
              </div>
            ))
          ) : (
            <Typography key="empty" variant="body2">
              No users liked this post.
            </Typography>
          )}
        </div>
      </Box>
    </Modal>
  );
}

export default LikedUserModal;
