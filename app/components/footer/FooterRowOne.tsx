/*import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const FooterRowOne = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-[30px]">
        <div className="flex gap-[30px]">
          <FaFacebook size={25} /> <FaTwitter size={25} />
        </div>
        <div className="flex md:gap-[30px] justify-between font-bold text-[14px] my-auto">
          <Link href="" className="uppercase">
            about
          </Link>
          <Link href="" className="uppercase">
            faq
          </Link>
          <Link href="" className="uppercase">
            blog
          </Link>
          <Link href="" className="uppercase">
            contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterRowOne;
*/


import React, { useContext } from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { ThemeContext } from "@/app/lib/ThemeContext";

const FooterRowOne = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-[30px]">
        <div className={`flex gap-[30px] ${theme === "dark" ? "text-white" : "text-[#434343]"}`}>
          <FaFacebook size={25} /> <FaTwitter size={25} />
        </div>
        <div className={`flex md:gap-[30px] justify-between font-bold text-[14px] my-auto ${theme === "dark" ? "text-white" : "text-[#434343]"}`}>
          <Link href="" className="uppercase">
            about
          </Link>
          <Link href="" className="uppercase">
            faq
          </Link>
          <Link href="" className="uppercase">
            blog
          </Link>
          <Link href="" className="uppercase">
            contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterRowOne;
