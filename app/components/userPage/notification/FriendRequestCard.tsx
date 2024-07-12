import React from "react";
import Image from "next/image";
import { UserDataType } from "@/app/types/user";
import avatar from "@/public/images/robot.png";

interface FriendRequestCardProps {
  friend: UserDataType;
  onConfirm: (friend: UserDataType) => void;
  onDelete: (friend: UserDataType) => void;
}

const FriendRequestCard: React.FC<FriendRequestCardProps> = ({
  friend,
  onConfirm,
  onDelete,
}) => {
  const { firstName, lastName, profilePicture } = friend;

  return (
    <div
      className={`group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl dark:before:from-gray-700 dark:before:via-gray-900 dark:before:to-black dark:bg-gray-800 text-white before:from-sky-200 before:via-orange-200 before:to-orange-700 bg-slate-50 text-gray-700 before:absolute before:top-0 w-[50%] md:w-[33.3%] lg:w-[25%] h-75 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden`}
    >
      <Image
        src={profilePicture || avatar}
        alt={`${firstName}`}
        layout="fixed"
        width={112}
        height={112}
        className="w-28 h-28 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-20 group-hover:-translate-y-20 transition-all duration-500"
      />
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500 pb-3 w-full">
        <span className="text-[20px] font-semibold">
          {lastName} {firstName}
        </span>
        <p className="text-[13px]">Support Specialist</p>
        <div className="flex flex-col mt-2 w-[100%] gap-y-2 px-2">
          <button
            className={`font-semibold py-2 px-4 rounded w-full dark:bg-green-600 dark:hover:bg-green-700 dark:text-white bg-green-500 hover:bg-green-600 text-white`}
            onClick={() => onConfirm(friend)}
          >
            Confirm
          </button>
          <button
            className={`font-semibold py-2 px-4 rounded w-full dark:bg-green-600 dark:hover:bg-green-700 dark:text-white bg-green-500 hover:bg-green-600 text-white`}
            onClick={() => onDelete(friend)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
