"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { IoClose } from "react-icons/io5";
import { IoIosCamera } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { BsSendFill } from "react-icons/bs";
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
//import Webcam from 'react-webcam';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

interface Comment {
  _id: string;
  content: string;
  postId: string;
}

interface CommentFullScreenDialogProps {
  setOpenCommentDialog: React.Dispatch<boolean>;
  openCommentDialog: boolean;
  user: User;
  post: Post | null;
  selectedPostId: string;
}

export default function CommentFullScreenDialog({
  openCommentDialog,
  setOpenCommentDialog,
  user,
  post,
  selectedPostId,
}: CommentFullScreenDialogProps) {
  const [commentContent, setCommentContent] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const webcamRef = useRef(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleClose = () => {
    setOpenCommentDialog(false);
  };

  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentContent(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmitComment = async () => {
    try {
      const response = await axios.post("/api/posts/comments", {
        content: commentContent,
        postId: selectedPostId,
        userId: user._id,
      });

      if (response.status === 201) {
        console.log("Comment created successfully:", response.data);

      const newComment = response.data;
      console.log("New Comment:", newComment);

      // Update local comments state with the newly created comment
      setComments([...comments, newComment]);

      setCommentContent("");
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  useEffect(() => {
    if (openCommentDialog && selectedPostId) {
      fetchComments();
    }
  }, [openCommentDialog, selectedPostId, comments]);

  const fetchComments = async () => {
    try {
      const response = await axios.post(`/api/posts/get-comments`, {
        postId: selectedPostId
      });

      // console.log("response de",response)

      if (response.status === 200) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleCameraClick = () => {
    // Access user's camera
    navigator.mediaDevices.getUserMedia({ video: true });
    /*  .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.video.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        // Handle error (e.g., display error message to user)
      });*/
  };

  /* const handleCapture = () => {
    // Capture image from webcam
    const imageSrc = webcamRef.current.getScreenshot();
    // Handle the captured image data (e.g., display, store, or process)
    console.log('Captured image:', imageSrc);
  };*/

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openCommentDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="overflow-y-scroll "
      >
        <AppBar sx={{ position: "fixed" }} className="top-0 left-0 ">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <IoClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Comments
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <div className="comments mt-[60px]">
            {comments.length === 0 ? (
              <Typography variant="body1">No comments</Typography>
            ) : (
              comments.map((comment) => (
                <ListItemText key={comment._id} primary={comment.content} />
              ))
            )}
          </div>
          <div className="fixed bottom-0 left-0 py-2 flex items-center justify-center flex-col w-full">
            <Divider className="w-full bg-red-500 " />
            {/* <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', height: 'auto' }}
          /> */}
            <TextField
              label={`Comments as ${user.lastName} ${user.firstName}`}
              multiline
              rows={1}
              variant="outlined"
              value={commentContent}
              onChange={handleCommentContentChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="text-[12px] mt-2 hover:bg-gray-200 bg-gray-100 cursor-pointer rounded-lg px-3 w-[90%] focus:outline-none focus:border-none"
            />
            
         <Box sx={{ p: 2 }}>
      <Textarea
        placeholder={`Comments as ${user.lastName} ${user.firstName}` }
        defaultValu={commentContent}
        onChange={handleCommentContentChange}
        onFocus={handleFocus}
        onBlur={handleBlur} 
        minRows={1}
        maxRows={4}
        size="md"
        sx={{
        '&::before': {
          display: 'none',
        },
        '&:focus-within': {
          outline: '2px solid var(--Textarea-focusedHighlight)',
          outlineOffset: '2px',
        },
      }}
      />
    </Box>
         
            {/* Conditionally render icons */}
            {commentContent && (
              <div className="flex justify-between w-[90%] py-2">
                <IoIosCamera size={30} onClick={handleCameraClick} />
                <BsSendFill
                  onClick={handleSubmitComment}
                  size={25}
                  className={`${commentContent ? "text-blue-500" : ""}`}
                />
              </div>
            )}
          </div>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
