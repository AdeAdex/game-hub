import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";
import Link from "next/link";


const UserProfileSection = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="" className="text-xl font-semibold mb-4">Notifications</Link>
        {/* Add notifications component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="/settings" className="text-xl font-semibold mb-4">Settings</Link>
        {/* Add settings component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="" className="text-xl font-semibold mb-4">Profile Summary</Link>
        {/* Add profile summary component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="" className="text-xl font-semibold mb-4">Photos</Link>
        {/* Add photos component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="" className="text-xl font-semibold mb-4">Albums</Link>
        {/* Add albums component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="" className="text-xl font-semibold mb-4">Activities</Link>
        {/* Add activities component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <Link href="" className="text-xl font-semibold mb-4">Friends</Link>
        {/* Add friends list component */}
      </div>
    </>
  );
};

export default UserProfileSection;
