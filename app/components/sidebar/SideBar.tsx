import Link from "next/link";
import React from "react";
import Section from "./Section";

interface LinkItem {
  title: string;
}

interface SideBarProps {
  links: LinkItem[];
  links2: LinkItem[];
}
const SideBar: React.FC<SideBarProps> = ({ links, links2 }) => {
  return (
    <>
      <section className="bg-[#F4F4F4] w-full md:w-[16.6%] px-[15px] pt-[15px] overflow-y-auto">
        <Section title="popular tags" links={links} />
        <Link href="" className="text-[14px] capitalize leading-[28px]">
          browse all tags
        </Link>

        <div className="mt-[30px] flex flex-col gap-y-[30px]">
          <Section title="browse" links={links2} />
          <Section title="browse" links={links2} />
          <Section title="browse" links={links2} />
          <Section title="browse" links={links2} />
        </div>
      </section>
    </>
  );
};

export default SideBar;
