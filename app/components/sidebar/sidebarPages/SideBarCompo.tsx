import React from "react";
import SideBarPageSection from "./SideBarPageSection";
import Link from "next/link";

const SideBarCompo = () => {
  return (
    <section className="hidden md:flex flex-col w-full md:w-[16.6%] px-[15px] pt-[15px] overflow-y-auto fixed h-full bg-[#F4F4F4] text-black dark:bg-gray-900 dark:text-white">
      <SideBarPageSection title="filter results" />
      <Link href="" className="text-[14px] capitalize leading-[28px]">
        browse all tags →
      </Link>
      <div className="mt-[30px] flex flex-col gap-y-[30px]">
        <SideBarPageSection title="price" />
      </div>
    </section>
  );
};

export default SideBarCompo;
