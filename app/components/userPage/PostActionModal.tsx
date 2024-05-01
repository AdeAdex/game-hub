"use client";

import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import {
  MdDelete,
  MdEdit,
  MdVisibility,
  MdBookmark,
  MdReport,
  MdContentCopy, 
} from "react-icons/md";
import axios from "axios";
import AlertDialogSlide from "./AlertDialogSlide";
import PostModal from "./PostModal";

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
    currentFriends?: string[];
  };
  likes: number;
  dislikes: number;
  likedBy: string[];
  image: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
  currentFriends?: string[];
}

interface PostActionModalProps {
  open: boolean;
  handleClose: () => void;
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loggedInUserId: string;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
  user: User;
  editSelectedPost: string;
  setEditSelectedPost: React.Dispatch<string>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;

}

const PostActionModal: React.FC<PostActionModalProps> = ({
  open,
  handleClose,
  post,
  setPosts,
  loggedInUserId,
  openCreatePostModal,
  setOpenCreatePostModal,
  user,
  editSelectedPost,
  setEditSelectedPost,
  selectedPost,
  setSelectedPost

}) => {
  const [actionResponse, setActionResponse] = useState<string>("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [copied, setCopied] = useState<string>("");

  const handleClickOpen = (postId: string) => {
    setSelectedPostId(postId);
    setOpenDialog(true);
    handleClose();
  };

  const handleUpdate = (postId: string) => {
    setEditSelectedPost(postId);
    setOpenEditModal(true);
    setOpenCreatePostModal(true);
    setSelectedPost(post); 
    // console.log(selectedPost?.content)
    handleClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCopy = (content: string ) => {
    setCopied(content);
    navigator.clipboard.writeText(content); 
    setTimeout(() => setCopied(""), 3000); 
    handleClose();
  } 

  const handleAction = async (action: string, postId: string) => {
    try {
      setLoading(true);
      let endpoint = "";
      let successMessage = "";
      let method = "";

      switch (action) {
        case "delete":
          endpoint = `/api/posts/delete`;
          method = "DELETE";
          successMessage = "Post deleted successfully.";
          break;
        case "edit":
          endpoint = `/api/posts/edit`;
          method = "PUT";
          successMessage = "Post deleted successfully.";
          break;
        case "hide":
          endpoint = `/api/posts/hide`;
          method = "PUT";
          successMessage = "Post hidden successfully.";
          break;
        case "save":
          endpoint = `/api/posts/save`;
          method = "POST";
          successMessage = "Post saved successfully.";
          break;
        case "report":
          endpoint = `/api/posts/report`;
          method = "POST";
          successMessage = "Post deleted successfully.";
          break;
        default:
          break;
      }

      if (endpoint && method) {
        const response = await axios({
          method: method,
          url: endpoint,
          data: { userId: loggedInUserId, postId },
        });
        if (response.data.success) {
          setActionResponse(response.data.message);
          console.log(response.data.message);
          // Update local state after action
          if (action === "delete" || action === "hide") {
            setPosts((prevPosts) =>
              prevPosts.filter((post) => post._id !== postId)
            );
          }
          handleClose();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setLoading(false); // Set loading to false when action completes
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
        <Box
          sx={style}
          className="bg-gray-100 rounded-md shadow-sm border-none"
        >
          <Typography variant="h6" component="h2" className="bg-white p-2">
            Take Action
          </Typography>
          <hr className="bg-red-500 mb-4" />
          {post.userId._id === loggedInUserId && (
            <div className="mb-4 bg-white rounded-lg shadow-lg p-2">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleClickOpen(post._id)}
                  className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md "
                >
                  <MdDelete className="mr-2 my-auto size={12}" />
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(post._id)}
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
                onClick={() => handleCopy(post.content)}
                className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
              >
                <MdContentCopy className="mr-2 my-auto size={12}" />
                Copy Post
              </button>
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
      <AlertDialogSlide
        loading={loading}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        selectedPostId={selectedPostId}
        handleAction={handleAction}
      />
      <PostModal
        user={user} // Make sure to replace `user` with the actual user object
        setPosts={setPosts}
        editSelectedPost={editSelectedPost}
        setEditSelectedPost={setEditSelectedPost}
        openCreatePostModal={openCreatePostModal}
        setOpenCreatePostModal={setOpenCreatePostModal}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
};

export default PostActionModal;
