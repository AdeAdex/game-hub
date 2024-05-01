"use client" 

import React, { useState } from "react";
import { Modal, Box, Typography, Button, Snackbar, Stack } from "@mui/material";
import { MdContentCopy, MdDelete, MdEdit, MdVisibility, MdBookmark, MdReport } from "react-icons/md";
import { useSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import AlertDialogSlide from "./AlertDialogSlide";
import PostModal from "./PostModal";
import { Alert, AlertTitle } from "@mui/material";

// Define Post and User types
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

interface Post {
  _id: string;
  content: string;
  timestamp: string;
  userId: User;
  likes: number;
  dislikes: number;
  likedBy: string[];
  image: string;
}

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

const PostActionModal = ({
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
  setSelectedPost,
}: {
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
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [copiedContent, setCopiedContent] = useState<string>("");

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedContent(content);

    enqueueSnackbar("Post has been copied.", { variant: "success" });

    handleClose();
  };

  const handleAction = async (action: string, postId: string) => {
    try {
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
          successMessage = "Post updated successfully.";
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
          successMessage = "Post reported successfully.";
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
          enqueueSnackbar(response.data.message, { variant: "success" });

          if (action === "delete" || action === "hide") {
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
          }
          handleClose();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("An error occurred.", { variant: "error" });
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
                  <MdDelete className="mr-2 my-auto" size={20} />
                  Delete
                </button>
                <button
                  onClick={() => handleAction("edit", post._id)}
                  className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
                >
                  <MdEdit className="mr-2 my-auto" size={20} />
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
                <MdContentCopy className="mr-2 my-auto" size={20} />
                Copy Post
              </button>
              <button
                onClick={() => handleAction("hide", post._id)}
                className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
              >
                <MdVisibility className="mr-2 my-auto" size={20} />
                Hide Post
              </button>
              <button
                onClick={() => handleAction("save", post._id)}
                className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
              >
                <MdBookmark className="mr-2 my-auto" size={20} />
                Save Post
              </button>
              <button
                onClick={() => handleAction("report", post._id)}
                className="w-full hover:bg-gray-300 flex my-auto p-2 rounded-md"
              >
                <MdReport className="mr-2 my-auto" size={20} />
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
        open={open}
        handleCloseDialog={handleClose}
        handleAction={handleAction}
        post={post}
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
