import React, { useContext } from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const FooterRowOne = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-[30px]">
        <div
          className={`flex gap-[30px] dark:text-white light:text-[#434343] `}
        >
          <FaFacebook size={25} /> <FaTwitter size={25} />
        </div>
        <div
          className={`flex md:gap-[30px] justify-between font-bold text-[14px] my-auto dark:text-white light:text-[#434343]`}
        >
          <Link href="/about" className="uppercase">
            about
          </Link>
          <Link href="/support" className="uppercase">
            faq
          </Link>
          <Link href="/services" className="uppercase">
            services
          </Link>
          <Link href="/support" className="uppercase">
            contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterRowOne;
