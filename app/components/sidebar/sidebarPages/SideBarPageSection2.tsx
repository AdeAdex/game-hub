"use client";

import React from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Link from "next/link";
import { RatingRange } from "@/app/utils/ratingUtils";



interface SideBarPageSectionProps {
  title: string;
  ratings?: RatingRange[];
}

const SideBarPageSection2: React.FC<SideBarPageSectionProps> = ({
  title,
  ratings = [], // Provide a default empty array in case ratings is undefined
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const handleChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <h3 className="uppercase text-[16px] font-[700] py-[8px] dark:text-gray-300 text-[#434343]">
        {title}
      </h3>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        className="dark:bg-dark-mode bg-light-mode"
      >
        <AccordionSummary
          expandIcon={
            expanded ? (
              <AiOutlineUp className="dark:text-white text-black" />
            ) : (
              <AiOutlineDown className="dark:text-white text-black" />
            )
          }
          aria-controls="rating-content"
          id="rating-header"
        >
          <h4 className="text-[14px] capitalize dark:text-white text-black">
            Rating
          </h4>
        </AccordionSummary>
        <AccordionDetails className="border-t border-rose-600">
          <div className="w-full text-[14px] capitalize leading-[28px]">
            {ratings.map((range, index) => (
              <Link
                key={index}
                href={`/games?rating_min=${range.min}&rating_max=${range.max}`}
                className="flex items-center w-full dark:bg-dark-mode bg-light-mode shadow-sm p-2 mb-2"
              >
                <span className="ml-2 dark:text-white text-black">
                  {range.label} {/* Display rating range */}
                </span>
              </Link>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SideBarPageSection2;
