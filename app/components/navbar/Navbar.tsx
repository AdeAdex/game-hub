"use client";

import React, { useState } from "react";
import Links from "./links/Links";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AuthButton from "./AuthButton";
import MenuIcon from "./MenuIcon";
import { links, links2 } from "@/app/lib/SideBarLinks";
import Dropdown from "./links/Dropdown";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false)

  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

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
          <div className="my-auto flex">
            {session?.user ? (
              <div className="flex flex-col relative">
              <div className="flex gap-3 cursor-pointer" onClick={handleDropdown} >
                <Image
                  src={session?.user?.image || "/images/ade.png"}
                  alt="profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="my-auto text-[14px] font-bold">Adex</span>
                <FaAngleDown size={18} className="my-auto"/>
              </div>
              {dropdown && (
                <div className="absolute top-10 right-0 bg-red-500 z-20 w-[200px]">
                  adex
                </div>
              )}
              </div>
            ) : (
              <AuthButton title="login" to="/login" />
            )}
          </div>
          <div className="my-auto hidden md:flex">
            {session?.user ? (
              <div></div>
            ) : (
              <AuthButton title="register" to="/register" />
            )}
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
