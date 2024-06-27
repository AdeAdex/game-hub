import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface ProfileDropdownProps {
  handleClick: () => void; // Assuming handleClick is a function that doesn't take any arguments and returns void
  username: string;
  email: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  handleClick,
  username,
  email
}) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div
      className={`absolute top-14 right-0 z-20 w-[200px] flex flex-col gap-[5px] text-[14px] rounded-sm border border-2 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      <small
        className={`uppercase px-4 nav-dropdown py-1 ${
          theme === "dark" ? "bg-gray-700" : "bg-[#F4F4F4]"
        }`}
      >
        Explore
      </small>
      <Link
        href={`/${username}/library`}
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        My library
      </Link>
      <div
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        Recommendation
      </div>
      <div
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        Game Jams
      </div>
      <small
        className={`uppercase px-4 nav-dropdown py-1 ${
          theme === "dark" ? "bg-gray-700" : "bg-[#F4F4F4]"
        }`}
      >
        Create
      </small>
      <Link
        href="/dashboard"
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        Dashboard
      </Link>
     
      <Link
        href="/upload-game"
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        Upload new project
      </Link>
      <Link
        href="/developer"
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        Developer
      </Link>
      <small
        className={`uppercase px-4 nav-dropdown py-1 ${
          theme === "dark" ? "bg-gray-700" : "bg-[#F4F4F4]"
        }`}
      >
        Account
      </small>
      <Link
        href={`/${username}`}
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        View profile
      </Link>
      <Link
        href={`/settings?email=${email}`}
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        Settings
        </Link>
      <div
        className={`px-4 nav-dropdown ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
        onClick={handleClick}
      >
        logout
      </div>
    </div>
  );
};

export default ProfileDropdown;
