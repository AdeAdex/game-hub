import React from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import ImageSkeleton from "./ImageSkeleton";
import avatar from "../../../public/images/robot.png";
import MobileUserProfileSection from "./MobileUserProfileSection";

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

interface UserAvatarSectionProps {
  isLoading: boolean;
  user: User;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserAvatarSection: React.FC<UserAvatarSectionProps> = ({
  isLoading,
  user,
  handleFileSelect,
}) => {
  return (
    <>
      <div className="text-center">
        <label
          htmlFor="avatarInput"
          style={{ cursor: "pointer" }}
          className="relative"
        >
          {isLoading ? (
            <ImageSkeleton /> // Render skeleton while image is loading
          ) : user.profilePicture ? (
            <>
              <Image
                src={user.profilePicture}
                alt="Profile Picture"
                width={128}
                height={128}
                className="mx-auto rounded-full"
              />
              <FaCamera
                size={30}
                className="absolute top-[65%] right-[60%] p-1 bg-gray-500 rounded-full"
              />
            </>
          ) : (
            <>
              <Image
                src={avatar}
                alt="Avatar"
                width={128}
                height={128}
                className="mx-auto rounded-full"
              />
              <FaCamera
                size={30}
                className="absolute top-[65%] right-[60%] p-1 bg-gray-500 rounded-full"
              />
            </>
          )}
        </label>
        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
          {user.firstName} {user.lastName}
        </h1>
        <p className="mt-1 text-lg text-gray-500">{user.userName}</p>
      </div>
      <div className="mt-8 md:hidden">
        <MobileUserProfileSection user={user} />
      </div>
    </>
  );
};

export default UserAvatarSection;
