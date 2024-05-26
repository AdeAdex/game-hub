"use client";

import React, { useContext } from "react";
import Description from "./Description";
import Headings from "./Headings";
import { HeroData } from "@/app/lib/RegisterHeroData";
import { ThemeContext } from "@/app/lib/ThemeContext";

const Hero: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`w-full flex flex-col md:w-[50%] px-[10px] gap-[25px] pt-[30px] pb-[40px] text-[13px] ${theme === "dark" ? "text-gray-300" : "text-[#434343]"}`}>
      {HeroData.map((data, index) => (
        <div key={index} className="flex flex-col gap-[15px]">
          <Headings
            title={data.title}
            className={`font-bold ${index === 0 ? "text-[20px]" : "text-[16px]"}`}
          />
          <Description content={data.contents} />
        </div>
      ))}
    </div>
  );
};

export default Hero;
