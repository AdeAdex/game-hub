import React, { useContext } from "react";
import Link from "next/link";
import { browseData } from "./BrowseData";

interface TagItem {
  name: string;
}

interface SideBarTypes {
  tags: TagItem[];
  title: string;
}

const tagLinks = Object.fromEntries(
  browseData.map(({ name, link }) => [name, link])
);

const Section: React.FC<SideBarTypes> = ({ tags, title }) => {
  return (
    <div>
      <h3
        className={`uppercase text-[16px] font-[700] py-[8px] dark:text-gray-300 text-[#434343]`}
      >
        {title}
      </h3>
      <div className="w-full text-[14px] capitalize leading-[28px]">
        <div className="w-full flex flex-wrap justify-between">
          {tags?.map((tag, index) => {
            const link = tagLinks[tag.name] || `/games?tags=${tag.name}`;
            return (
              <Link
                href={link}
                className={`capitalize w-[50%] dark:text-gray-400 dark:hover:underline dark:hover:text-red-500 text-black hover:underline hover:text-red-500`}
                key={index}
              >
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section;
