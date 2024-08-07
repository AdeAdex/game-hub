"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
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
import { SnackbarProvider, useSnackbar } from "notistack";
import { FaLink } from "react-icons/fa6";
import { UserDataType } from "@/app/types/user";
import { CommentDataType } from "@/app/types/comments";

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
  userId: UserDataType;
  likes: number;
  dislikes: number;
  likedBy: string[];
  comments: CommentDataType[];
  image: string;
}

interface PostActionModalProps {
  open: boolean;
  handleClose: () => void;
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loggedInUserId: string;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
  user: UserDataType;
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
  setSelectedPost,
}) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp
        open={open}
        handleClose={handleClose}
        post={post}
        setPosts={setPosts}
        loggedInUserId={loggedInUserId}
        openCreatePostModal={openCreatePostModal}
        setOpenCreatePostModal={setOpenCreatePostModal}
        user={user}
        editSelectedPost={editSelectedPost}
        setEditSelectedPost={setEditSelectedPost}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </SnackbarProvider>
  );
};

function MyApp({
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
}: PostActionModalProps) {
  const [actionResponse, setActionResponse] = useState<string>("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [copiedContent, setCopiedContent] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

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

  const handleCopy = (contentType: string, postId: string) => {
    let copyContent = "";
    switch (contentType) {
      case "post":
        copyContent = post.content; // Access post content
        break;
      case "link":
        copyContent = `https://adex-game-hub.vercel.app/posts/${postId}`;
        break;
      default:
        break;
    }

    navigator.clipboard.writeText(copyContent);
    setCopiedContent(copyContent);
    handleClose();
    enqueueSnackbar(
      `${contentType === "link" ? "Link" : "Post"} copied successfully.`,
      {
        variant: "success",
      }
    );
  };

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
          successMessage = "Post edited successfully.";
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
          setActionResponse(response.data.message);
          enqueueSnackbar(response.data.message, { variant: "success" });

          // Update local state after successful action
          if (action === "delete" || action === "hide") {
            setPosts((prevPosts) =>
              prevPosts.filter((post) => post._id !== postId)
            );
          }
        }
      }
    } catch (error: any) {
      setActionResponse(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      // Handle other types of errors if necessary
    } finally {
      setLoading(false); // Set loading to false when action completes
      handleClose();
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
          sx={{
            ...style,
            backgroundColor: "dark:#333333 #FFFFFF",
            color: "dark:#FFFFFF #000000",
          }}
          className="rounded-md shadow-sm border-none dark:bg-dark-mode bg-[#FFFFFF] dark:text-[#FFFFFF] text-[#000000]"
        >
          <Typography
            variant="h6"
            component="h2"
            className={`p-2 dark:text-gray-200 text-gray-900`}
          >
            Take Action
          </Typography>
          <hr className="bg-red-500 mb-4" />
          {post.userId._id === loggedInUserId && (
            <div
              className={`mb-4 rounded-lg shadow-lg p-2 dark:bg-gray-800 dark:text-gray-200 bg-white text-gray-900`}
            >
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleClickOpen(post._id)}
                  className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
                >
                  <MdDelete
                    className={`mr-2 my-auto size={12} dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
                  />
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(post._id)}
                  className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
                >
                  <MdEdit
                    className={`mr-2 my-auto size={12} dark:text-gray-200 text-gray-900`}
                  />
                  Edit
                </button>
              </div>
            </div>
          )}
          <div
            className={`mb-4 rounded-lg shadow-lg p-2 dark:bg-gray-800 dark:text-gray-200 bg-white text-gray-900`}
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleCopy("post", post._id)}
                className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
              >
                <MdContentCopy
                  className={`mr-2 my-auto size={12} dark:text-gray-200 text-gray-900`}
                />
                Copy Post
              </button>
              <button
                onClick={() => handleAction("hide", post._id)}
                className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
              >
                <MdVisibility
                  className={`mr-2 my-auto size={12} dark:text-gray-200 text-gray-900`}
                />
                Hide Post
              </button>
              <button
                onClick={() => handleAction("save", post._id)}
                className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
              >
                <MdBookmark
                  className={`mr-2 my-auto size={12} dark:text-gray-200 text-gray-900`}
                />
                Save Post
              </button>
              <button
                onClick={() => handleAction("report", post._id)}
                className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
              >
                <MdReport
                  className={`mr-2 my-auto size={12} dark:text-gray-200 text-gray-900`}
                />
                Report Post
              </button>
              <button
                onClick={() => handleCopy("link", post._id)}
                className={`w-full  flex my-auto p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-600 text-gray-900  hover:bg-gray-300`}
              >
                <FaLink
                  className={`mr-2 my-auto size={12} dark:text-gray-200 text-gray-900`}
                />
                Copy Link
              </button>
            </div>
          </div>
          <div>
            <Button
              onClick={handleClose}
              className={`w-full dark:bg-gray-800 bg-gray-400 dark:hover:bg-gray-900 dark:text-white hover:bg-gray-300`}
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
}

export default PostActionModal;
