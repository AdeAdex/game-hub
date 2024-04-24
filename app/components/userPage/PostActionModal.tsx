import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";


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
