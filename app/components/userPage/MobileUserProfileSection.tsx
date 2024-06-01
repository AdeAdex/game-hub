import React, { useState, useContext } from "react";
import FriendsModal from "./FriendsModal";
import { UserDataType } from "@/app/types/user";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Assuming you have a ThemeContext for managing the theme

interface MobileUserProfileSectionProps {
  user: UserDataType;
}

const MobileUserProfileSection: React.FC<MobileUserProfileSectionProps> = ({
  user,
}) => {
  const { theme } = useContext(ThemeContext); // Access the theme from ThemeContext
  const [openFriendsDialog, setOpenFriendsDialog] = useState(false);

  const handleFriends = () => {
    console.log(user);
    setOpenFriendsDialog(true);
  };

  return (
    <div className={`flex justify-between ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
      <button className={`py-1 px-2 rounded-sm ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-300"}`}>Post</button>
      <button className={`py-1 px-2 rounded-sm ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-300"}`}>About</button>
      <button className={`py-1 px-2 rounded-sm ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-300"}`}>Photos</button>
      <button
        className={`py-1 px-2 rounded-sm ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-300"}`}
        onClick={handleFriends}
      >
        Friends
      </button>
      <FriendsModal
        openFriendsDialog={openFriendsDialog}
        setOpenFriendsDialog={setOpenFriendsDialog}
        user={user}
      />
    </div>
  );
};

export default MobileUserProfileSection;
