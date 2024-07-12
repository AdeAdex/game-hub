"use client";

import React, { useContext } from "react";
import Logo from "../navbar/Logo";
import ThemeToggle from "@/app/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav
      className={`w-full flex px-5 py-3 shadow-md dark:bg-gray-900 dark:text-white bg-white text-black`}
    >
      <div className="flex mx-auto">
        <Logo />
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
