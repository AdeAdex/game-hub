"use client";

import React, { useState } from "react";
import Links from "./links/Links";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AuthButton from "./AuthButton";
import MenuIcon from "./MenuIcon";
import { links, links2 } from "@/app/lib/SideBarLinks";
import Dropdown from "./links/Dropdown";
// import  {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main>
      <nav className="w-full flex px-5 py-3 shadow-md justify-between md:gap-8 lg:justify-between bg-white">
        <div className="flex gap-5">
          <MenuIcon
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <Logo />
        </div>
        <Links />
        <Dropdown
          links={links}
          links2={links2}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <SearchBox />
        <div className="flex gap-8">
          <div className="my-auto">
            <AuthButton title="login" to="/login" />
          </div>
          <div className="my-auto hidden md:flex">
            <AuthButton title="register" to="/register" />
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
