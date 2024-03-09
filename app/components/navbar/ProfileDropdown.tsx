import React from "react";

interface ProfileDropdownProps {
  handleClick: () => void; // Assuming handleClick is a function that doesn't take any arguments and returns void
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ handleClick }) => {
  return (
    <>
      <div className="absolute top-10 right-0 bg-white z-20 w-[200px] flex flex-col gap-[5px] text-[14px] rounded-sm border border-2">
        <small className="bg-[#F4F4F4] uppercase px-4 nav-dropdown py-1">
          Explore
        </small>
        <div className="px-4 nav-dropdown">My library</div>
        <div className="px-4 nav-dropdown">Recommendation</div>
        <div className="px-4 nav-dropdown">Game Jams</div>
        <small className="bg-[#F4F4F4] uppercase px-4 nav-dropdown py-1">
          Create
        </small>
        <div className="px-4 nav-dropdown">Dashboard</div>
        <div className="px-4 nav-dropdown">Posts</div>
        <div className="px-4 nav-dropdown">Upload new project</div>
        <div className="px-4 nav-dropdown">Host game jam</div>
        <small className="bg-[#F4F4F4] uppercase px-4 nav-dropdown py-1">
          Account
        </small>
        <div className="px-4 nav-dropdown">View profile</div>
        <div className="px-4 nav-dropdown">Settings</div>
        <div className="px-4 nav-dropdown" onClick={handleClick}>
          logout
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
