import React from "react";
import Description from "./Description";
import Headings from "./Headings";
import { HeroData } from "@/app/lib/RegisterHeroData";

const Hero: React.FC = () => {
  return (
    <div className="w-full flex flex-col  w-full md:w-[50%] px-[10px] gap-[25px] pt-[30px] text-[13px] text-[#434343]">
      {HeroData.map((data, index) => (
        <div key={index} className="flex flex-col gap-[15px]">
          <Headings
            title={data.title}
            className={`font-bold ${
              index == 0 ? "text-[20px]" : "text-[16px]"
            }`}
          />
          <Description content={data.contents} />
        </div>
      ))}
    </div>
  );
};

export default Hero;
