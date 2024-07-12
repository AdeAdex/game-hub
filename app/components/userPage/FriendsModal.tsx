"use client";

import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import axios from "axios";
import { FiMessageCircle } from "react-icons/fi";
import { UserDataType } from "@/app/types/user";

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

interface FriendsModalProps {
  openFriendsDialog: boolean;
  setOpenFriendsDialog: React.Dispatch<boolean>;
  user: UserDataType;
}

const FriendsModal: React.FC<FriendsModalProps> = ({
  openFriendsDialog,
  setOpenFriendsDialog,
  user,
}) => {
  const [friends, setFriends] = useState<UserDataType[]>([]);

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
        <Box
          sx={style}
          className={`rounded-md shadow-sm border-none dark:bg-gray-800 text-white bg-white text-black`}
        >
          <Typography variant="h6" component="h2">
            Friends
          </Typography>
          <hr />
          {friends.map((friend) => (
            <div className="flex justify-between mb-4 " key={friend._id}>
              <div className="flex py-2 gap-2">
                <div className="relative w-10 h-10 mr-2">
                  <Image
                    src={friend.profilePicture || avatar}
                    alt="Profile Picture"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
                <div className="text-[12px] fw-bold">
                  {friend.firstName} {friend.lastName}
                </div>
              </div>
              <button
                className={`cursor-pointer my-auto py-2 px-2 rounded-lg text-[14px] flex gap-1 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white bg-gray-300 hover:bg-gray-400 text-black`}
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
