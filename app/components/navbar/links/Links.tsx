import { linksdata } from "@/app/data/LinksData";
import React from "react";

const Links = () => {
  return (
    <div className="flex w-full">
      <ul className="flex gap-4">
        {linksdata.map((link, index) => (
          <li key={index}>{link.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Links;
