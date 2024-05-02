import Link from "next/link";
import React from "react";
import Section from "../../sidebar/Section";
import SearchBox from "../SearchBox";

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
  return (
    <>
      <section
        className={`md:hidden bg-[#F4F4F4] w-full px-[15px] pt-[15px] pb-[80px] overflow-y-auto h-screen nav-list relative ${
          isMobileMenuOpen ? "open" : ""
        } `}
      >
        <SearchBox ClassName={`mb-[10px] flex`} Placeholder={`Search games & creator`} />
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
    </>
  );
};

export default Dropdown;
