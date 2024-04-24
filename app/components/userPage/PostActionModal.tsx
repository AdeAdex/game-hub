'use client' 

import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { MdDelete, MdEdit, MdVisibility, MdBookmark, MdReport } from "react-icons/md";
import axios from "axios" 


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Post {
  _id: string;
  content: string;
  timestamp: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    profilePicture: string;
    bio: string;
  };
  likes: number;
  dislikes: number;
  likedBy: string[];
  image: string;
}

interface PostActionModalProps {
  open: boolean;
  handleClose: () => void;
  post: Post;
  loggedInUserId: string;
}

const PostActionModal: React.FC<PostActionModalProps> = ( { open,
  handleClose,
  post,
  loggedInUserId, }) => {

  const [actionResponse, setActionResponse] = useState<string>("");

  const handleAction = async (action: string, post_id: string) => {
  try {
      let endpoint = "";
      let successMessage = "";

      switch (action) {
        case "delete":
          endpoint = `/api/posts/delete`;
          successMessage = "Post deleted successfully.";
          break;
        case "edit":
          endpoint = `/api/posts/edit`;
          successMessage = "Post deleted successfully.";
          break;
        case "hide":
          endpoint = `/api/posts/hide`;
          successMessage = "Post hidden successfully.";
          break;
        case "save":
          endpoint = `/api/posts/save`;
          successMessage = "Post saved successfully.";
          break;
        case "report":
          endpoint = `/api/posts/report`;
          successMessage = "Post deleted successfully.";
          break;
        default:
          break;
      }

      if (endpoint !== "") {
        const response = await axios.post(endpoint, { userId: loggedInUserId, postId: post_id});
        setActionResponse(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
  }
      
};
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-gray-100 rounded-md shadow-sm border-none">
          <Typography variant="h6" component="h2" className="bg-white p-2" >
            Take Action
          </Typography>
          <hr className="bg-red-500 mb-4" />
          {post.userId._id === loggedInUserId && (
          <div className="mb-4 bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleAction("delete", post._id )}
                className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md "
              >
                <MdDelete className="mr-2 my-auto size={12}" />
                Delete
              </button>
              <button
                onClick={() => handleAction("edit", post._id)}
                className="w-full  hover:bg-gray-300 flex my-auto p-2 rounded-md "
              >
                <MdEdit className="mr-2 my-auto" size={12} />
                Edit
              </button>
            </div>
          </div>
        )}
        <div className="mb-4 bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleAction("hide", post._id)}
              className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
            >
              <MdVisibility className="mr-2 my-auto size={12}" />
              Hide Post
            </button>
            <button
              onClick={() => handleAction("save", post._id)}
              className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
            >
              <MdBookmark className="mr-2 my-auto size={12}" />
              Save Post
            </button>
            <button
              onClick={() => handleAction("report", post._id)}
              className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
            >
              <MdReport className="mr-2 my-auto size={12}" />
              Report Post
            </button>
          </div>
        </div>
        <div>
          <Button
            onClick={handleClose}
            className="w-full bg-gray-200 hover:bg-gray-300"
          >
            Close
          </Button>
        </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostActionModal;
