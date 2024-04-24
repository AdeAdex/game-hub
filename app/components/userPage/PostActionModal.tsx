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

interface PostActionModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const PostActionModal: React.FC<PostActionModalProps> = ( { open, handleClose }) => {
 
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
          <div className="flex py-2 gap-2"></div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostActionModal;
