import { links } from "@/app/lib/LinksData";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="hidden md:flex my-auto uppercase nav-links  text-[#434343] text-[14px] font-[700] overflow-x-auto relative">
      <ul className="flex gap-4 my-auto">
        {links.map((link, index) => (
          <Link key={index} href={link.pathname} className="w-auto link py-2">
            <li className="w-auto whitespace-nowrap overflow-hidden">{link.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Links;
