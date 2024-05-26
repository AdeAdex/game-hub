"use client";
import React, { useContext } from "react";
import Logo from "../navbar/Logo";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext
import ThemeToggle from "@/app/components/ThemeToggle";

const Navbar = () => {
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

  return (
    <nav className={`w-full flex px-5 py-3 shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex mx-auto">
        <Logo />
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
