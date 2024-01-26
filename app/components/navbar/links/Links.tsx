import { links } from "@/app/lib/LinksData";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="hidden md:flex my-auto uppercase text-[#434343] text-[14px] font-[700] overflow-hidden relative">
      <ul className="flex gap-4 overflow-hidden relative">
        {links.map((link, index) => (
          <Link key={index} href={link.pathname}>
            <li>{link.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Links;
