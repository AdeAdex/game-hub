import React, { useContext } from "react";
import Link from "next/link";

const FooterRowTwo = () => {

  return (
    <>
      <div className={`flex flex-col md:flex-row gap-[30px] py-[20px] text-[14px] dark:text-white text-[#434343]`}>
        <div>Copyright &copy; {new Date().getFullYear()} Adex.</div>
        <ul className="flex md:gap-[30px] pl-[20px] md:pl-[unset] justify-between capitalize list-disc">
          <Link href="/store">
            <li>store</li>
          </Link>
          <Link href="/terms-condition">
            <li>terms</li>
          </Link>
          <Link href="/privacy-policy">
            <li>privacy</li>
          </Link>
          <Link href="/cookies">
            <li>cookies</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default FooterRowTwo;
