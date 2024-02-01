import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <main>
      <footer className="flex flex-col justify-center px-[10px] md:px-[30px] md:px-[unset] md:items-center py-[20px] pt-[30px] text-[#434343]">
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
        <div className="flex flex-col md:flex-row gap-[30px] py-[20px] text-[14px]">
          <div>Copyright &copy; {new Date().getFullYear()} Adex.</div>
          <ul className="flex md:gap-[30px] pl-[20px] md:pl-[unset] justify-between capitalize list-disc">
            <li>directory</li>
            <li>terms</li>
            <li>privacy</li>
            <li>cookies</li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
