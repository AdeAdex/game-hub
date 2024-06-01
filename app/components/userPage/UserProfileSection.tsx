import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

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
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        {/* Add notifications component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        {/* Add settings component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
        {/* Add profile summary component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Photos</h2>
        {/* Add photos component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Albums</h2>
        {/* Add albums component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Activities</h2>
        {/* Add activities component */}
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        } rounded-lg shadow-lg p-6 mb-8`}
      >
        <h2 className="text-xl font-semibold mb-4">Friends</h2>
        {/* Add friends list component */}
      </div>
    </>
  );
};

export default UserProfileSection;
