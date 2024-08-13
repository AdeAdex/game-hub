"use client";

import React from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Link from "next/link";

interface SideBarPageSectionProps {
  title: string;
  prices?: number[];
}

const SideBarPageSection2: React.FC<SideBarPageSectionProps> = ({
  title,
  prices,
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
            expanded === true ? (
              <AiOutlineUp className="dark:text-white text-black" />
            ) : (
              <AiOutlineDown className="dark:text-white text-black" />
            )
          }
          aria-controls="platform-content"
          id="platform-header"
          className=""
        >
          <h4 className="text-[14px] capitalize dark:text-white text-black">
            Price
          </h4>
        </AccordionSummary>
        <AccordionDetails className="border-t border-rose-600">
          <div className="w-full text-[14px] capitalize leading-[28px]">
            {prices &&
              prices.length > 0 &&
              prices.map((price, index) => (
                <Link
                href={`/games?price=${price.toFixed(2)}`}
                key={index}
                className="flex items-center w-full dark:bg-dark-mode bg-light-mode shadow-sm p-2 mb-2"
              >
                  <span className="ml-2 dark:text-white text-black">
                    ${price.toFixed(2)} {/* Display price */}
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
