import React, { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/app/lib/ThemeContext";

const FooterRowTwo = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`flex flex-col md:flex-row gap-[30px] py-[20px] text-[14px] ${theme === "dark" ? "text-white" : "text-[#434343]"}`}>
        <div>Copyright &copy; {new Date().getFullYear()} Adex.</div>
        <ul className="flex md:gap-[30px] pl-[20px] md:pl-[unset] justify-between capitalize list-disc">
          <Link href="">
            <li>directory</li>
          </Link>
          <Link href="/terms-condition">
            <li>terms</li>
          </Link>
          <Link href="/privacy-policy">
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
