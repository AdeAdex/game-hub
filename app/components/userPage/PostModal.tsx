"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import avatar from "../../../public/images/robot.png";
import { UserDataType } from "@/app/types/user";
import { PostDataType } from "@/app/types/post";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PostModalProps {
  user: UserDataType;
  setPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
  editSelectedPost: string;
  setEditSelectedPost: React.Dispatch<string>;
  selectedPost: PostDataType | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostDataType | null>>;
}

const PostModal: React.FC<PostModalProps> = ({
  user,
  setPosts,
  openCreatePostModal,
  setOpenCreatePostModal,
  editSelectedPost,
  setEditSelectedPost,
  selectedPost,
  setSelectedPost,
}) => {
  //const [open, setOpen] = useState(false);
  // const [postContent, setPostContent] = useState("");
  const [postContent, setPostContent] = useState(
    selectedPost ? selectedPost.content : ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //const [postImage, setPostImage] = useState<string | null>(null);
  const [postImage, setPostImage] = useState<string | null>(
    selectedPost ? selectedPost.image : null
  );
  const [loading, setLoading] = useState(false);
  const [myPost, setMyPost] = useState<PostDataType | null>(null);

  // useEffect(() => {
  //  if (selectedPost) {
  //  setPostContent(selectedPost.content);
  //    setPostImage(selectedPost.image);
  //   }
  //  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      setPostContent(selectedPost.content);
      setPostImage(selectedPost.image);
    } else {
      setPostContent("");
      setPostImage(null);
    }
  }, [selectedPost]);

  const handleClose = () => {
    setPostContent("");
    setPostImage(null);
    setEditSelectedPost(""); // Reset editSelectedPost
    setOpenCreatePostModal(false);
  };

  const handlePostContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      console.error("No file selected");
      return;
    }

    const selectedImage = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      setPostImage(imageData);
      //       console.log("Image Data:", imageData);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading state to true when submitting
    try {
      if (!user) {
        console.error("User is null");
        return;
      }

      let postData: any = {
        content: postContent,
        userId: user._id,
      };

      if (postImage) {
        postData.image = postImage;
      }

      console.log(postData);

      // const response = await axios.post("/api/posts", postData);

      let response;
      if (editSelectedPost) {
        // Edit existing post
        response = await axios.put(`/api/posts/edit`, {
          postId: editSelectedPost,
          ...postData,
        });
      } else {
        // Create new post
        response = await axios.post("/api/posts", postData);
      }

      const updatedPost = response.data;

      // Update posts state based on the operation (edit or create)
      if (editSelectedPost) {
        // Update existing post in the posts array
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      } else {
        // Prepend the new post to the existing posts array
        setPosts((prevPosts) => [updatedPost, ...prevPosts]);
      }

      // Clear form fields after successful submission
      setPostContent("");
      setPostImage(null);
    } catch (error: any) {
      console.error("Error creating post:", error);
      // Handle error
    } finally {
      setLoading(false); // Reset loading state after submission
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={openCreatePostModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-md shadow-sm border-none dark:bg-gray-800 dark:text-white bg-white"
        >
          <Typography variant="h6" component="h2">
            {editSelectedPost ? "Edit Post" : "Create a Post"}
          </Typography>
          <hr />
          <div className="flex py-2 gap-2">
            <div className="relative w-8 h-8 mr-2">
              {user.profilePicture ? (
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={user.profilePicture}
                    alt="Profile Picture"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={avatar}
                    alt="Profile Picture"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="text-[12px] font-bold">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <TextField
            label={`What's on your mind ${user.firstName}`}
            multiline
            rows={4}
            variant="outlined"
            value={postContent}
            onChange={handlePostContentChange}
            fullWidth
            margin="normal"
            InputProps={{
              className: "dark:bg-gray-700 dark:text-white bg-white text-black",
            }}
            InputLabelProps={{
              className: "dark:text-white",
            }}
          />
          <div>
            {editSelectedPost ? (
              postImage ? (
                <Image
                  src={postImage}
                  alt="PostImage"
                  width={100}
                  height={100}
                  layout="fixed"
                  className="w-full h-full object-cover cursor-pointer"
                  priority // Optional: indicates that this image is considered high priority
                />
              ) : (
                <div>No image selected</div>
              )
            ) : (
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ margin: "16px 0" }}
                className="dark:bg-gray-700 dark:text-white bg-white text-black"
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full rounded-lg py-2 mt-2 ${
              postContent || postImage
                ? "bg-blue-500 text-white"
                : "bg-gray-400 dark:bg-gray-700 dark:text-white text-black"
            }`}
            disabled={!postContent && !postImage}
          >
            {loading
              ? editSelectedPost
                ? "Saving..."
                : "Posting..."
              : editSelectedPost
              ? "Save"
              : "Post"}
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default PostModal;
