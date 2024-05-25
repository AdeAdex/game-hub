import Link from "next/link";
import React, { useContext } from "react";
import Section from "./Section";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface LinkItem {
  title: string;
}

interface SideBarProps {
  links: LinkItem[];
  links2: LinkItem[];
}

const SideBar: React.FC<SideBarProps> = ({ links, links2 }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <section className={`hidden md:flex flex-col w-full md:w-[16.6%] px-[15px] pt-[15px] overflow-y-auto fixed h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#F4F4F4] text-black'}`}>
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

export default SideBar;
