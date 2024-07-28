import Link from "next/link";
import React from "react";
import Section from "../../sidebar/Section";
import SearchBox from "../SearchBox";
import { Game } from "@/app/types/homePage/games";
import Links from "@/app/components/navbar/links/Links";

interface LinkItem {
  title: string;
}

interface SideBarProps {
  links: LinkItem[];
  links2: LinkItem[];
  isMobileMenuOpen: boolean;
  // suggestions: Game[]; // Add suggestions prop
  suggestions: { game: Game; matchType: string }[];
  onSearch: (query: string) => void; // Add onSearch prop
}

const Dropdown: React.FC<SideBarProps> = ({
  links,
  links2,
  isMobileMenuOpen,
  suggestions, // Add suggestions prop
  onSearch, // Add onSearch prop
}) => {
  return (
    <section
      className={`md:hidden w-full px-[15px] pt-[15px] pb-[80px] overflow-y-auto h-screen nav-list relative dark:bg-gray-900 dark:text-white bg-[#F4F4F4] text-black  ${
        isMobileMenuOpen ? "open" : ""
      }`}
    >
      <SearchBox
        ClassName={`mb-[10px] flex`}
        Placeholder={`Search games & creator`}
        inputClassName={`text-[14px] px-3 h-[30px] dark:bg-gray-800 bg-[#F4F4F4] dark:text-white text-black my-auto w-[90%]`}
        onSearch={onSearch}
        suggestions={suggestions}
      />
      <div className="flex py-3 border-b w-full">
        <Links ClassName={`flex flex-col w-full`} />
      </div>
      <Section title="popular tags" links={links} />
      <Link href="" className="text-[14px] capitalize leading-[28px]">
        browse all tags →
      </Link>

      <div className="mt-[30px] flex flex-col gap-y-[30px]">
        <Section title="browse" links={links2} />
      </div>
    </section>
  );
};

export default Dropdown;
