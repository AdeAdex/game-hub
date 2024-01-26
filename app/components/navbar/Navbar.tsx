"use client"
import React, { useState } from "react";
import Links from "./links/Links";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AuthButton from "./AuthButton";
import MenuIcon from "./MenuIcon";
import { links, links2 } from "@/app/lib/SideBarLinks";
import Dropdown from "./links/Dropdown";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main>
      <nav className="w-full flex px-5 py-3 shadow-md justify-between md:gap-8 lg:justify-between">
        <div className="flex gap-5">
        <MenuIcon
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <Logo />
        </div>
        <Links />
        <Dropdown links={links} links2={links2} isMobileMenuOpen={isMobileMenuOpen}/>
        <SearchBox />
        <div className="flex gap-8">
          <AuthButton title="login" />
          <div className="my-auto hidden md:flex">
            <AuthButton title="register" />
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
