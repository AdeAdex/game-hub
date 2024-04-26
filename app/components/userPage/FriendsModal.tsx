import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Image from "next/image";
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

interface FriendsModalProps {
  openFriendsDialog: boolean;
  setOpenFriendsDialog: React.Dispatch<boolean>;
}

const FriendsModal: React.FC<FriendsModalProps> = ({
  openFriendsDialog,
  setOpenFriendsDialog,
}) => {
  const handleClose = () => {
    setOpenFriendsDialog(false);
  };
  return (
    <div>
      <Modal
        open={openFriendsDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md shadow-sm border-none">
          <Typography variant="h6" component="h2">
            Friends
          </Typography>
          <hr />
          <div className="flex py-2 gap-2">
            <div className="relative w-8 h-8 mr-2">
              {/* {user.profilePicture ? (
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={user.profilePicture}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              ) : ( */}
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src={avatar}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              {/* )} */}
            </div>
            <div className="text-[12px] fw-bold">
              {/* {user.firstName} {user.lastName} */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FriendsModal;
