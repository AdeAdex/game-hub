import React, { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

const FooterRowTwo = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <>
      <div className={`flex flex-col md:flex-row gap-[30px] py-[20px] text-[14px] ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
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
