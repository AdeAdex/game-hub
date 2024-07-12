import { links } from "@/app/lib/LinksData";
import Link from "next/link";
import React, { useContext } from "react";

interface LinksProps {
  ClassName?: string;
}
const Links: React.FC<LinksProps> = ({ ClassName }) => {
  return (
    <div
      className={`dark:text-white text-[#434343] ${ClassName} md:my-auto capitalize nav-links gap-2 md:gap-4 text-[14px] font-[700] overflow-x-auto relative `}
    >
      {/* <ul className="flex gap-4 my-auto"> */}
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.pathname}
          className="w-full md:w-auto link py-2"
        >
          <span className="w-auto whitespace-nowrap overflow-hidden">
            {link.title}
          </span>
        </Link>
      ))}
      {/* </ul> */}
    </div>
  );
};

export default Links;
