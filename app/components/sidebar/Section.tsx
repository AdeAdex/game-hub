// import { links, links2 } from '@/app/lib/SideBarLinks'
import React from "react";
import Link from "next/link";

interface LinkItem {
  title: string;
}

interface SideBarTypes {
  links: LinkItem[];
  title: string;
}

const Section: React.FC<SideBarTypes> = ({ links, title }) => {
  return (
    <>
    <div>
      <h3 className="uppercase text-[#434343] text-[16px] font-[700] py-[8px]">
        {title}
      </h3>
      <div className="w-full text-[14px] capitalize leading-[28px]">
        <Link href="" className="w-full flex flex-wrap justify-between">
          {links.map((link, index) => (
            <span className="capitalize w-[50%]" key={index}>
              {link.title}
            </span>
          ))}
        </Link>
      </div>
    </div>
    </>
  );
};

export default Section;
