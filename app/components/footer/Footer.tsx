"use client";

import React, { useContext } from "react";
import FooterRowOne from "./FooterRowOne";
import FooterRowTwo from "./FooterRowTwo";
import { ThemeContext } from "@/app/lib/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main>
      <footer className={`flex flex-col justify-center px-[10px] md:px-[30px] md:px-[unset] md:items-center py-[20px] pt-[30px] ${theme === "dark" ? "text-white dark-mode" : "text-[#434343] bg-[#F4F4F4]"}`}>
        
        {/* Footer Row One */}
        <FooterRowOne />

        {/* Footer Row Two */}
        <FooterRowTwo />
      </footer>
    </main>
  );
};

export default Footer;
