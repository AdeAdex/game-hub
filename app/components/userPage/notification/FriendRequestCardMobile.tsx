import React from "react";
import Image from "next/image";
import { UserDataType } from "@/app/types/user";
import avatar from "@/public/images/robot.png";

interface FriendRequestCardProps {
  friend: UserDataType;
  onConfirm: (friend: UserDataType) => void;
  onDelete: (friend: UserDataType) => void;
}

const FriendRequestCardMobile: React.FC<FriendRequestCardProps> = ({
  friend,
  onConfirm,
  onDelete,
}) => {
  const { firstName, lastName, profilePicture } = friend;

  return (
    <div className="flex justify-between hover:bg-gray-200 mb-2 cursor-pointer py-1 px-2">
      <div className="flex items-center  w-[100%]">
        <div className="relative  mr-2">
          <Image
            src={profilePicture || avatar}
            alt={`${firstName}`}
            layout="fixed"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="text-[14px] text-gray-700 font-semibold">
          <div>
            {lastName} {firstName}
          </div>
          <div className="flex flex mt-2 w-full gap-x-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded w-full"
              onClick={() => onConfirm(friend)}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded w-full"
              onClick={() => onDelete(friend)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCardMobile;
