'use client'

import React from "react";
import { PlatformDetails } from "@/app/types/homePage/games";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid } from 'react-icons/fa';
import { IoLogoGameControllerA } from 'react-icons/io';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h3 className="uppercase text-[16px] font-[700] py-[8px] dark:text-gray-300 text-[#434343]">
        {title}
      </h3>
      <Accordion expanded={expanded} onChange={handleChange} className="dark:bg-dark-mode bg-light-mode">
        <AccordionSummary
          expandIcon={expanded ? <AiOutlineUp /> : <AiOutlineDown />}
          aria-controls="platform-content"
          id="platform-header"
          className=""
        >
          <h4 className="text-[14px] capitalize dark:text-white text-black">Platform</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full text-[14px] capitalize leading-[28px]">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="flex items-center w-full dark:bg-dark-mode bg-light-mode shadow-sm p-2 mb-2"
              >
                {/* Display the platform icon */}
                {getPlatformIcon(platform.slug)}
                <span className="ml-2 dark:text-white text-black">{platform.name}</span>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SideBarPageSection;
