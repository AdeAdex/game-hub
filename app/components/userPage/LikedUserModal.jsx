import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import avatar from "../../../public/images/robot.png"; // Ensure avatar is imported correctly
import { FaUserPlus } from "react-icons/fa";

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

const LikedUserModal /* : React.FC<LikedUserModalProps>  */ = ({
  open,
  handleClose,
  likedBy,
}) => {
  console.log("liked", likedBy);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-md shadow-sm border-none w-[400px] md:w-[600px]">
        <Typography variant="h6" component="h2" className="text-[14px]">
          Users Who Liked This Post
        </Typography>
        <hr />
        <div className="flex flex-wrap flex-col py-2 gap-2">
          {likedBy.length > 0 ? (
            likedBy.map((user) => (
              <div className="flex justify-between">
                <div key={user._id} className="flex items-center">
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
                <button className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1">
                  <FaUserPlus className="my-auto" /> <span className="my-auto">Add Friend</span>
                </button>
              </div>
            ))
          ) : (
            <Typography variant="body2">No users liked this post.</Typography>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default LikedUserModal;
