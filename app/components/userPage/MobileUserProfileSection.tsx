import React from "react";

const MobileUserProfileSection = () => {
  return (
    <div className="flex justify-between">
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">Post</button>
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">About</button>
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">Photos</button>
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">
        Friends
      </button>
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">Album</button>
    </div>
  );
};

export default MobileUserProfileSection;
