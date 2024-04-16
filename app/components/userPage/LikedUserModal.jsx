import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import avatar from "../../../public/images/robot.png"; // Ensure avatar is imported correctly
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";



const style = {
  // position: "absolute" as "absolute",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// interface LikedUserModalProps {
//   open: boolean;
//   handleClose: () => void;
//   likedBy: string[];
// //   likedBy: User[]; // Define the likedBy prop as an array of User objects
// }

const LikedUserModal /* : React.FC<LikedUserModalProps>  */ = ({ open, handleClose, likedBy }) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp open={open} handleClose={handleClose} likedBy={likedBy} />
    </SnackbarProvider>
  );
 
};

function MyApp({
  open,
  handleClose,
  likedBy,
}) {

  console.log("liked", likedBy);
  const { enqueueSnackbar } = useSnackbar();


  const handleAddFriend = async (userId) => {
    try {
      // Make a POST request to the backend API
      const response = await axios.post("/api/username/add-friends", {
        userId,
      });
      console.log(response.data); // Logging the response for now
      enqueueSnackbar(response.data.message, { variant: "success" });

      // Optionally, update UI or perform any other action after adding friend
    } catch (error) {
      console.error(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="rounded-md shadow-sm border-none w-[400px] md:w-[600px]"
      >
        <Typography variant="h6" component="h2" className="text-[14px]">
          Users Who Liked This Post
        </Typography>
        <hr />
        <div className="flex flex-wrap flex-col py-2 gap-2">
          {likedBy.length > 0 ? (
            likedBy.map((user) => (
              <div className="flex justify-between" key={user._id}>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-2">
                    <Image
                      src={user.profilePicture || avatar}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-[12px] fw-bold">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
                <button
                  className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
                  onClick={() => handleAddFriend(user._id)}
                >
                  <FaUserPlus className="my-auto" />{" "}
                  <span className="my-auto">Add Friend</span>
                </button>
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


