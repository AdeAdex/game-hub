import React from "react";
import Logo from "../navbar/Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex px-5 py-3 shadow-md bg-white">
      <div className="flex mx-auto">
        <Logo />
      </div>
    </nav>
  );
};

export default Navbar;
