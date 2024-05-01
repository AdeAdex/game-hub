"use client" 

import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { MdDelete, MdEdit, MdVisibility, MdBookmark, MdReport, MdContentCopy } from "react-icons/md";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import SnackbarProvider and useSnackbar
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
  const { enqueueSnackbar } = useSnackbar(); // Access enqueueSnackbar from useSnackbar

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    enqueueSnackbar('Post has been copied.', { variant: 'success' }); // Show success snackbar
    handleClose();
  };

  const handleAction = async (action: string, postId: string) => {
    try {
      const endpoint = `/api/posts/${action}`;
      const method = action === "delete" || action === "hide" ? "DELETE" : "PUT";

      const response = await axios({
        method: method,
        url: endpoint,
        data: { userId: loggedInUserId, postId },
      });

      if (response.data.success) {
        // Update local state after successful action
        if (action === "delete" || action === "hide") {
          setPosts((prevPosts) =>
            prevPosts.filter((p) => p._id !== postId)
          );
        }
        enqueueSnackbar(response.data.message, { variant: 'success' }); // Show success snackbar with message
        handleClose();
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar('An error occurred.', { variant: 'error' }); // Show error snackbar
    }
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-gray-100 rounded-md shadow-sm border-none">
          <Typography variant="h6" component="h2" className="bg-white p-2">
            Take Action
          </Typography>
          <hr className="bg-red-500 mb-4" />
          {post.userId._id === loggedInUserId && (
            <div className="mb-4 bg-white rounded-lg shadow-lg p-2">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleAction("delete", post._id)}
                  className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
                >
                  <MdDelete className="mr-2 my-auto size={12}" />
                  Delete
                </button>
                <button
                  onClick={() => handleAction("edit", post._id)}
                  className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
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
            <Button onClick={handleClose} className="w-full bg-gray-200 hover:bg-gray-300">
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      <AlertDialogSlide
        loading={loading}
        handleCloseDialog={handleClose}
        openDialog={open}
        selectedPostId={post._id}
        handleAction={handleAction}
      />
      <PostModal
        user={user}
        setPosts={setPosts}
        editSelectedPost={editSelectedPost}
        setEditSelectedPost={setEditSelectedPost}
        openCreatePostModal={openCreatePostModal}
        setOpenCreatePostModal={setOpenCreatePostModal}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </SnackbarProvider>
  );
};

export default PostActionModal;
