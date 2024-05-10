"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IoClose } from "react-icons/io5";
import { IoIosCamera } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { BsSendFill } from "react-icons/bs";
import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";
import Webcam from "react-webcam";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import AILoader from "../AILoader";
import { UserDataType } from "@/app/types/user";
import { PostDataType } from "@/app/types/post";
import { CommentDataType } from "@/app/types/comments";
import PostComponent from "./PostComponent";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CommentFullScreenDialogProps {
  setOpenCommentDialog: React.Dispatch<boolean>;
  openCommentDialog: boolean;
  user: UserDataType;
  post: PostDataType | null;
  selectedPostId: string;
  setPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  comments: CommentDataType[];
  setComments: React.Dispatch<React.SetStateAction<CommentDataType[]>>;
  updatePostComments: (postId: string, newComments: CommentDataType[]) => void;
}

export default function CommentFullScreenDialog({
  openCommentDialog,
  setOpenCommentDialog,
  user,
  post,
  selectedPostId,
  setPosts,
  comments,
  setComments,
  updatePostComments,
}: CommentFullScreenDialogProps) {
  const [commentContent, setCommentContent] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  console.log("open commen dialog", openCommentDialog)


  const handleClose = () => {
    if (webcamRef.current) {
      webcamRef.current.video?.pause();
    }
    setOpenCommentDialog(false);
  };

  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
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
        const newComment = response.data;
        console.log("returend", response.data);

        // Clear the comment content input after successful submission
        setCommentContent("");

        // Update local comments state with the newly created comment
        setComments([...comments, newComment]);

        // Inform PostComponent about the updated comments
        const updatedComments = [...comments, newComment];
        updatePostComments(selectedPostId, updatedComments);
      } else {
        console.error(
          "Failed to create comment - Unexpected status:",
          response.status
        );
      }
    } catch (error: any) {
      console.error("Failed to create comment:", error.message);
      // Handle specific errors or show user-friendly error messages
      if (error.response) {
        console.error("Server responded with:", error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (openCommentDialog && selectedPostId) {
      // console.log(post)
      fetchComments();
    }
  }, [openCommentDialog, selectedPostId, comments, commentContent]);

  const fetchComments = async () => {
    try {
      const response = await axios.post(`/api/posts/get-comments`, {
        postId: selectedPostId,
      });

      // console.log("response de", response);

      if (response.status === 200) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleCameraClick = () => {
    setShowCamera(true);
    // Access user's camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const currentWebcam = webcamRef.current;
        if (currentWebcam) {
          // Check if video property exists before assigning srcObject
          if (currentWebcam.video) {
            currentWebcam.video.srcObject = stream;
          } else {
            console.error("Webcam video property is missing");
          }
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
        // Handle error (e.g., display error message to user)
      });
  };

  const handleCapture = () => {
    // Capture image from webcam
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Handle the captured image data (e.g., display, store, or process)
      console.log("Captured image:", imageSrc);
    } else {
      console.error("Unable to capture image: webcamRef.current is null");
    }
  };

  const calculateElapsedTime = (timestamp: string): string => {
    const commentTimestamp = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - commentTimestamp.getTime();

    // Calculate elapsed minutes
    const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} min ago`;
    }

    // Calculate elapsed hours
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
      return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
    }

    // Calculate elapsed days
    const elapsedDays = Math.floor(elapsedHours / 24);
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  };

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
              {post?.userId && (
                <>
                  {post?.userId?.firstName} {""}Post
                </>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <div className="comments mt-[60px] pb-[100px] px-2">
           {/* Render PostComponent with the current post */}
           {post && (
              <PostComponent
                posts={[post]} // Pass post as part of an array of posts
                likedPosts={[]} // Provide an empty array for liked posts
                handleReaction={() => {}} // Dummy handler for reactions
                handleShare={() => {}} // Dummy handler for sharing
                user={user}
                setPosts={setPosts}
                openCreatePostModal={false}
                setOpenCreatePostModal={() => {}}
                editSelectedPost=""
                setEditSelectedPost={() => {}}
                selectedPost={null}
                setSelectedPost={() => {}}
                loggedInUserId={user._id}
              />
            )}
            <small className="py-2 my-2 ">Comments</small>
            {comments.length === 0 ? (
              <div className="flex items-center justify-center h-full ">
                <div className="flex items-center justify-center w-full ">
                  <AILoader />
                </div>
              </div>
            ) : (
              comments
                .slice()
                .reverse()
                .map((comment) => (
                  <div className="flex gap-2 mb-2 mt-3 px-2" key={comment._id}>
                    <div className="relative w-9 h-9">
                    <Image
                      src={comment.userId?.profilePicture || avatar}
                      alt="Profile Picture"
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                    <div className="">
                      <div className="flex flex-col rounded-lg bg-gray-100 p-2">
                        <small className="font-bold">
                          {comment.userId
                            ? `${comment.userId.lastName} ${comment.userId.firstName}`
                            : "Unknown User"}
                        </small>
                        <small>{comment.content}</small>
                      </div>
                      <small className="flex justify-between text-[10px] px-2">
                        {calculateElapsedTime(comment.timestamp)}
                      </small>
                    </div>
                  </div>
                ))
            )}
          </div>
          <div className="fixed bottom-0 left-0 py-2 bg-white flex items-center justify-center flex-col w-full">
            <Divider className="w-full bg-gray-500 " />
            <Divider className="w-full bg-gray-500 " />
            {/* Conditionally render webcam */}
            {showCamera && (
              <Webcam
                audio={false}
                ref={webcamRef as React.RefObject<Webcam>}
                screenshotFormat="image/jpeg"
                style={{ width: "100%", height: "auto" }}
              />
            )}

            <Box
              sx={{
                p: 2,
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              className=""
            >
              <div className="relative w-8 h-8 my-auto mr-2">
                {user.profilePicture ? (
                  <div className="relative w-9 h-9">
                    <Image
                      src={user.profilePicture}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="relative w-9 h-9 ">
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
              <Textarea
                placeholder={`Comments as ${user.lastName} ${user.firstName}`}
                value={commentContent}
                onChange={handleCommentContentChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                minRows={1}
                maxRows={4}
                size="md"
                sx={{
                  "&::before": {
                    display: "none",
                  },
                  "&:focus-within": {
                    outline: "2px solid var(--Textarea-focusedHighlight)",
                    outlineOffset: "2px",
                  },
                  flex: 1, // This will make the Textarea take up remaining space
                  minWidth: 0, // Ensure Textarea can shrink to fit content
                }}
              />
            </Box>
            <Divider className="w-full bg-gray-500 " />

            {/* Conditionally render icons */}
            {(commentContent || isFocused) && (
              <div className="flex justify-between w-[90%] py-2">
                <IoIosCamera
                  size={30}
                  onClick={handleCameraClick}
                  className="cursor-pointer"
                />
                <BsSendFill
                  onClick={handleSubmitComment}
                  size={25}
                  className={`cursor-pointer ${
                    commentContent ? "text-blue-500" : ""
                  }`}
                />
              </div>
            )}
          </div>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
