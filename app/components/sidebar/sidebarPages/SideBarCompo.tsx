import React from "react";
import SideBarPageSection from "./SideBarPageSection";
import { PlatformDetails } from "@/app/types/homePage/games";
import SideBarPageSection2 from "./SideBarPageSection2";

interface SideBarCompoProps {
 platforms: PlatformDetails[];
 prices: number[];
}

const SideBarCompo: React.FC<SideBarCompoProps> = ({platforms, prices}) => {
  return (
    <section className="hidden md:flex flex-col w-full md:w-[16.6%] px-[15px] pt-[15px] overflow-y-auto fixed h-full bg-[#F4F4F4] text-black dark:bg-gray-900 dark:text-white">
      <SideBarPageSection title="filter results" platforms={platforms} />
      <div className="mt-[30px] flex flex-col gap-y-[30px]">
        <SideBarPageSection2 title="price"  prices={prices}/>
      </div>
    </section>
  );
};

export default SideBarCompo;
