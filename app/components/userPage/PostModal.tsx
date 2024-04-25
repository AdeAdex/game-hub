import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import avatar from "../../../public/images/robot.png";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
}

interface Post {
  _id: string;
  content: string;
  timestamp: string;
  userId: User;
  likes: number;
  dislikes: number;
  likedBy: string[]; // Add the likedBy property here
  image: string;
}

interface PostModalProps {
  user: User;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
 // selectedPost: string;
}

const PostModal: React.FC<PostModalProps> = ({ user, setPosts }) => {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postImage, setPostImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

      const response = await axios.post("/api/posts", postData);

      // After posting, update the UI with the new post
      const newPost = response.data; // Assuming the response contains the newly created post data
      // You can add the new post to the beginning of the posts array
      setPosts((prevPosts) => [newPost, ...prevPosts]);
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
      <div className="flex gap-2 bg-white mb-4 p-4 rounded-lg shadow-md mt-6 ">
        <div className="relative w-8 h-8 mr-2">
          {user.profilePicture ? (
            <div className="relative w-10 h-10 mr-2">
              <Image
                src={user.profilePicture}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="relative w-10 h-10 mr-2">
              <Image
                src={avatar}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
        </div>
        <input
          onClick={handleOpen}
          type="text"
          readOnly
          placeholder={`What's on your mind ${user.firstName}`}
          className="hover:bg-gray-200 bg-gray-100 cursor-pointer rounded-lg py-2 px-3 w-full focus:outline-none focus:border-none"
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md shadow-sm border-none">
          <Typography variant="h6" component="h2">
            Create a Post
          </Typography>
          <hr />
          <div className="flex py-2 gap-2">
            <div className="relative w-8 h-8 mr-2">
              {user.profilePicture ? (
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={user.profilePicture}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={avatar}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="text-[12px] fw-bold">
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
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ margin: "16px 0" }}
          />

          <button
            onClick={handleSubmit}
            className={`w-full rounded-lg py-2 ${
              postContent || postImage
                ? "bg-blue-500 text-white"
                : "bg-gray-400"
            }`}
            disabled={!postContent && !postImage}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default PostModal;
