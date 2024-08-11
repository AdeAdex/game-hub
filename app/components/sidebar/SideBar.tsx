import Link from "next/link";
import React from "react";
import Section from "./Section";
import { Game, Tag } from "@/app/types/homePage/games";

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

const SideBar: React.FC<SideBarProps> = ({ popularTags, browse}) => {
  return (
    <section className="hidden md:flex flex-col w-full md:w-[16.6%] px-[15px] pt-[15px] overflow-y-auto fixed h-full bg-[#F4F4F4] text-black dark:bg-gray-900 dark:text-white">
      <Section title="popular tags" tags={popularTags} />
      <Link href="" className="text-[14px] capitalize leading-[28px]">
        browse all tags →
      </Link>
      <div className="mt-[30px] flex flex-col gap-y-[30px]">
        <Section title="browse" tags={browse} />
      </div>
    </section>
  );
};

export default SideBar;
