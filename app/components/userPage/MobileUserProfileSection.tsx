import React, { useState } from "react";
import FriendsModal from "./FriendsModal";
import { UserDataType } from "@/app/types/user";


interface MobileUserProfileSectionProps {
  user: UserDataType;
}

const MobileUserProfileSection: React.FC<MobileUserProfileSectionProps> = ({
  user,
}) => {
  const [openFriendsDialog, setOpenFriendsDialog] = useState(false);
  const handleFriends = () => {
    console.log(user);
    setOpenFriendsDialog(true);
  };
  return (
    <div className="flex justify-between">
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">Post</button>
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">About</button>
      <button className="hover:bg-gray-300 py-1 px-2 rounded-sm">Photos</button>
      <button
        className="hover:bg-gray-300 py-1 px-2 rounded-sm"
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
