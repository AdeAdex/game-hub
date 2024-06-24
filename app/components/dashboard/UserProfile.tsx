import React, { useContext } from "react";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { UserDataType } from "../../types/user";
import avatar from "@/public/images/robot.png";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext
import Link from "next/link";


interface UserProfileProps {
  userData: UserDataType | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`shadow-lg rounded-lg p-8 mb-8 md:mb-0 md:w-1/3 lg:w-1/4 text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {userData && (
        <div className="space-y-6">
          <div className="mx-auto rounded-full w-32 h-32 relative overflow-hidden border-4 border-gray-300">
            <Image
              src={userData.profilePicture || avatar}
              alt="Profile"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {userData.userName}
          </div>
          <div className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {userData.firstName} {userData.lastName}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{userData.email}</div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{userData.phone}</div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{userData.bio}</div>
          <div className="flex justify-center space-x-4">
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 cursor-pointer" />
            </a>
            <a
              href={userData.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6 cursor-pointer" />
            </a>
            <a
              href={userData.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6 cursor-pointer" />
            </a>
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Role: {userData.role}</div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Status: {userData.status}</div>
          <Link href="/settings" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-3">
            Settings
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
