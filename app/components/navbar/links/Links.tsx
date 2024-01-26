import { links } from "@/app/lib/LinksData";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="flex w-full my-auto uppercase text-[#434343] text-[14px] font-[700]">
      <ul className="flex gap-4">
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
