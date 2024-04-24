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

  const handleAction = (action: string, post_id: string) => {
  switch (action) {
    case "delete":
      alert(action) 
      break;
    case "edit":
      alert(action) 
      break;
    case "hide":
      alert(action)
      break;
    case "save":
      alert(action)
      break;
    case "report":
      alert(action)
      break;
    default:
      break;
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
        <Box sx={style} className="rounded-md shadow-sm border-none">
          <Typography variant="h6" component="h2">
            Take Action
          </Typography>
          <hr />
          {post.userId._id === loggedInUserId && (
          <div className="mb-4">
            <div className="flex space-x-4">
              <Button
                variant="contained"
                onClick={() => handleAction("delete", post._id )}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAction("edit", post._id)}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
        <div className="mb-4">
          <div className="flex space-x-4">
            <Button
              variant="contained"
              onClick={() => handleAction("hide", post._id)}
              className="w-full bg-gray-500 hover:bg-gray-600"
            >
              Hide Post
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAction("save", post._id)}
              className="w-full bg-yellow-500 hover:bg-yellow-600"
            >
              Save Post
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAction("report", post._id)}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Report Post
            </Button>
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
