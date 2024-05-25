import React, { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface LinkItem {
  title: string;
}

interface SideBarTypes {
  links: LinkItem[];
  title: string;
}

const Section: React.FC<SideBarTypes> = ({ links, title }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div>
      <h3 className={`uppercase text-[16px] font-[700] py-[8px] ${theme === 'dark' ? 'text-gray-300' : 'text-[#434343]'}`}>
        {title}
      </h3>
      <div className="w-full text-[14px] capitalize leading-[28px]">
        <Link href="" className="w-full flex flex-wrap justify-between">
          {links.map((link, index) => (
            <span className={`capitalize w-[50%] ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`} key={index}>
              {link.title}
            </span>
          ))}
        </Link>
      </div>
    </div>
  );
};

export default Section;
