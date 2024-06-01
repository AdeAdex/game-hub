import React, { useContext } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import ImageSkeleton from "./ImageSkeleton";
import avatar from "../../../public/images/robot.png";
import MobileUserProfileSection from "./MobileUserProfileSection";
import { UserDataType } from "@/app/types/user";
import { ThemeContext } from "@/app/lib/ThemeContext";

interface UserAvatarSectionProps {
  isLoading: boolean;
  user: UserDataType;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserAvatarSection: React.FC<UserAvatarSectionProps> = ({
  isLoading,
  user,
  handleFileSelect,
}) => {
  const { theme } = useContext(ThemeContext);

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
        <h1 className={`mt-4 text-3xl font-extrabold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
          {user.firstName} {user.lastName}
        </h1>
        <p className={`mt-1 text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>@{user.userName}</p>
      </div>
      <div className="mt-8 md:hidden">
        <MobileUserProfileSection user={user} />
      </div>
    </>
  );
};

export default UserAvatarSection;
