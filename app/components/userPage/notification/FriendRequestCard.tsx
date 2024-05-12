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
    <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-[50%] md:w-[33.3%] lg:w-[25%] h-75 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
      <Image
        src={profilePicture || avatar}
        alt={`${firstName}`}
        layout="fixed"
        className="w-28 h-28  mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
      />
      <div className="z-10  group-hover:-translate-y-10 transition-all duration-500 pb-3">
        <span className="text-[20px] font-semibold">
          {lastName} {firstName}
        </span>
        <p className="text-[13px]">Support Specialist</p>
        <div className="flex flex-col mt-2 w-full gap-y-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
            onClick={() => onConfirm(friend)}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
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
