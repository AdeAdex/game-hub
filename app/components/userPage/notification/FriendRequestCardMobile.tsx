// import React from "react";
// import Image from "next/image";
// import { UserDataType } from "@/app/types/user";
// import avatar from "@/public/images/robot.png";

// interface FriendRequestCardProps {
//   friend: UserDataType;
//   onConfirm: (friend: UserDataType) => void;
//   onDelete: (friend: UserDataType) => void;
// }

// const FriendRequestCardMobile: React.FC<FriendRequestCardProps> = ({
//   friend,
//   onConfirm,
//   onDelete,
// }) => {
//   const { firstName, lastName, profilePicture } = friend;

//   return (
//     <div className="flex justify-between hover:bg-gray-200 mb-2 cursor-pointer py-1 px-2">
//       <div className="flex items-center  w-[100%]">
//         <div className="relative  mr-2">
//           <Image
//             src={profilePicture || avatar}
//             alt={`${firstName}`}
//             layout="fixed"
//             width={100}
//             height={100}
//             className="rounded-full"
//           />
//         </div>
//         <div className="text-[14px] text-gray-700 font-semibold">
//           <div>
//             {lastName} {firstName}
//           </div>
//           <div className="flex flex mt-2 w-full gap-x-2">
//             <button
//               className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded w-full"
//               onClick={() => onConfirm(friend)}
//             >
//               Confirm
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded w-full"
//               onClick={() => onDelete(friend)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FriendRequestCardMobile;



import React, { useContext } from "react";
import Image from "next/image";
import { UserDataType } from "@/app/types/user";
import avatar from "@/public/images/robot.png";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

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
  const { theme } = useContext(ThemeContext); // Use ThemeContext to get the current theme
  const { firstName, lastName, profilePicture } = friend;

  return (
    <div
      className={`flex justify-between mb-2 cursor-pointer py-1 px-2 ${
        theme === "dark" ? "hover:bg-gray-700 bg-gray-800 text-white" : "hover:bg-gray-200 bg-white text-gray-700"
      }`}
    >
      <div className="flex items-center w-[100%]">
        <div className="relative mr-2">
          <Image
            src={profilePicture || avatar}
            alt={`${firstName}`}
            layout="fixed"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="text-[14px] font-semibold">
          <div>
            {lastName} {firstName}
          </div>
          <div className="flex mt-2 w-full gap-x-2">
            <button
              className={`font-semibold py-1 px-4 rounded w-full ${
                theme === "dark"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              onClick={() => onConfirm(friend)}
            >
              Confirm
            </button>
            <button
              className={`font-semibold py-1 px-4 rounded w-full ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
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
