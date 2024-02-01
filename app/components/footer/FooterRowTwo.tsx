import React from "react";
import Link from "next/link";

const FooterRowTwo = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-[30px] py-[20px] text-[14px]">
        <div>Copyright &copy; {new Date().getFullYear()} Adex.</div>
        <ul className="flex md:gap-[30px] pl-[20px] md:pl-[unset] justify-between capitalize list-disc">
          <Link href="">
            <li>directory</li>
          </Link>
          <Link href="">
            <li>terms</li>
          </Link>
          <Link href="">
            <li>privacy</li>
          </Link>
          <Link href="">
            <li>cookies</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default FooterRowTwo;
