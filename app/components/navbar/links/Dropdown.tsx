import Link from "next/link";
import React, { useContext } from "react";
import Section from "../../sidebar/Section";
import SearchBox from "../SearchBox";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface LinkItem {
  title: string;
}

interface SideBarProps {
  links: LinkItem[];
  links2: LinkItem[];
  isMobileMenuOpen: boolean;
}

const Dropdown: React.FC<SideBarProps> = ({
  links,
  links2,
  isMobileMenuOpen,
}) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <section
      className={`md:hidden w-full px-[15px] pt-[15px] pb-[80px] overflow-y-auto h-screen nav-list relative ${isMobileMenuOpen ? "open" : ""} ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#F4F4F4] text-black'
      }`}
    >
      <SearchBox
        ClassName={`mb-[10px] flex`}
        Placeholder={`Search games & creator`}
        inputClassName={`text-[14px] px-3 h-[30px] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#F4F4F4] text-black'} my-auto w-[90%]`}
      />
      <Section title="popular tags" links={links} />
      <Link href="" className="text-[14px] capitalize leading-[28px]">
        browse all tags →
      </Link>

      <div className="mt-[30px] flex flex-col gap-y-[30px]">
        <Section title="browse" links={links2} />
        <Section title="browse" links={links2} />
        <Section title="browse" links={links2} />
        <Section title="browse" links={links2} />
      </div>
    </section>
  );
};

export default Dropdown;
