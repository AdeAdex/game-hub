import React from "react";
import { PlatformDetails } from "@/app/types/homePage/games";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid } from 'react-icons/fa';
import { IoLogoGameControllerA } from 'react-icons/io';

// Function to get the platform icon based on slug
const getPlatformIcon = (slug: string) => {
  switch (slug) {
    case 'pc':
      return <FaWindows className="text-white mx-1" />;
    case 'playstation':
      return <FaPlaystation className="text-blue-600 mx-1" />;
    case 'xbox':
      return <FaXbox className="text-green-600 mx-1" />;
    case 'ios':
      return <FaApple className="text-gray-500 mx-1" />;
    case 'android':
      return <FaAndroid className="text-green-500 mx-1" />;
    case 'mac':
      return <FaApple className="text-gray-500 mx-1" />;
    default:
      return <IoLogoGameControllerA className="text-gray-500 mx-1" />;
  }
};

interface SideBarPageSectionProps {
  title: string;
  platforms: PlatformDetails[];
}

const SideBarPageSection: React.FC<SideBarPageSectionProps> = ({ title, platforms }) => {
  return (
    <div>
      <h3 className="uppercase text-[16px] font-[700] py-[8px] dark:text-gray-300 text-[#434343]">
        {title}
      </h3>
      <div className="w-full text-[14px] capitalize leading-[28px]">
        <h4 className="mt-4 mb-3">Platform</h4>
        <div className="w-full">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="flex items-center w-full dark:bg-transparent bg-white shadow-sm p-2"
            >
              {/* Display the platform icon */}
              {getPlatformIcon(platform.slug)}
              <span className="ml-2">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarPageSection;
