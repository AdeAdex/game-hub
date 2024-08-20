import Link from "next/link";
import React from "react";
import Section from "./Section";

interface TagItem {
  name: string;
}

interface BrowseItem {
  id: number;
  name: string;
  link: string;
}

interface SideBarProps {
  browse: BrowseItem[];
  popularTags: TagItem[];
}

const SideBar: React.FC<SideBarProps> = ({ popularTags, browse }) => {
  return (
    <section className="hidden md:flex flex-col w-full md:w-[16.6%] px-[15px] pt-[15px]  pb-[100px] overflow-y-auto fixed h-full bg-[#F4F4F4] text-black dark:bg-gray-900 dark:text-white">
      <Section title="popular tags" tags={popularTags} />
      <Link href="/games" className="text-[14px] capitalize leading-[28px]">
        browse all tags →
      </Link>
      <div className="mt-[30px] flex flex-col gap-y-[30px]">
        <Section title="browse" tags={browse} />
      </div>

      {/* Additional Content */}
      <div className="mt-[30px]">
        {/* Call-to-Action Button */}
        <Link href="/support" className="block text-center bg-red-500 text-white py-[10px] rounded-md hover:bg-red-600">
          Subscribe for Updates
        </Link>

        {/* Recent Articles Section */}
        <div className="mt-[30px]">
          <h4 className="uppercase text-[16px] font-[700] py-[8px] dark:text-gray-300 text-[#434343]">
            Recent Articles
          </h4>
          <ul className="text-[14px] leading-[28px]">
            <li className="mb-[10px]">
              <Link href="/" className="dark:text-gray-400 text-black hover:underline">
                Understanding Game Genres: A Comprehensive Guide
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link href="/" className="dark:text-gray-400 text-black hover:underline">
                The Rise of Indie Games in 2024
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link href="/" className="dark:text-gray-400 text-black hover:underline">
                How to Optimize Your Gaming Setup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
