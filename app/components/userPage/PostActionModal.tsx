import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";


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

  const handleDelete = () => {
    alert(post.userId._id)
  };

  const handleEdit = () => {
    alert(post._id)
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md shadow-sm border-none">
          <Typography variant="h6" component="h2">
            Take Action
          </Typography>
          <hr />
          <div className="flex py-2 gap-2">
            {post.userId._id === loggedInUserId && (
          <>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
          </>
        )}
            <Button >Hide Post</Button>
        <Button >Save Post</Button>
        <Button >Report Post</Button>
        <Button >Close</Button>
      
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostActionModal;
