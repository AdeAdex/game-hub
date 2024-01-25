import { linksdata } from "@/app/lib/LinksData";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="flex w-full">
      <ul className="flex gap-4">
        {linksdata.map((link, index) => (
          <Link key={index} href={link.pathname}>
            <li>{link.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Links;
