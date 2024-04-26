'use client' 

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import axios from "axios";
import { FiMessageCircle } from "react-icons/fi";

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
  currentFriends?: string[];
}

interface FriendsModalProps {
  openFriendsDialog: boolean;
  setOpenFriendsDialog: React.Dispatch<boolean>;
  user: User;
}

const FriendsModal: React.FC<FriendsModalProps> = ({
  openFriendsDialog,
  setOpenFriendsDialog,
  user,
}) => {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.post("/api/username/friends", {
          userId: user._id,
        });
        const sanitizedFriends = response.data;
        setFriends(sanitizedFriends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (openFriendsDialog) {
      fetchFriends();
    }
  }, [openFriendsDialog, user._id]);

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
          {friends.map((friend) => (
        <div className="flex justify-between " key={friend._id} >
            <div className="flex py-2 gap-2">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src={friend.profilePicture || avatar}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="text-[12px] fw-bold">
                {friend.firstName} {friend.lastName}
              </div>
            </div>
          <button
                    className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
                    
                  >
                    <FiMessageCircle className="my-auto" />{" "}
                    <span className="my-auto">Message</span>
                  </button>
          </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default FriendsModal;
