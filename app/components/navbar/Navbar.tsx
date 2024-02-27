"use client";

import React, { useEffect, useState } from "react";
import Links from "./links/Links";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AuthButton from "./AuthButton";
import MenuIcon from "./MenuIcon";
import { links, links2 } from "@/app/lib/SideBarLinks";
import Dropdown from "./links/Dropdown";
import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";


interface AuthState {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
  };
  token: string;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);

  const userInfos = useSelector((state: any) => state.auth.userInformation);

  useEffect(() => {
    console.log("userInfos ", userInfos);
  }, []);

  // console.log(session);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  }

  const handleLogout = async () => {
    await signOut();
  };

  return (
    // <main>
    //   <nav className="w-full flex px-5 py-3 shadow-md justify-between md:gap-8 lg:justify-between bg-white">
    //     <div className="flex gap-5">
    //       <MenuIcon
    //         isMobileMenuOpen={isMobileMenuOpen}
    //         setMobileMenuOpen={setMobileMenuOpen}
    //       />
    //       <Logo />
    //     </div>
    //     <Links />
    //     <Dropdown
    //       links={links}
    //       links2={links2}
    //       isMobileMenuOpen={isMobileMenuOpen}
    //     />
    //     <SearchBox />
    //     <div className="flex gap-8">
    //       <div className="my-auto flex">
    //         {session?.user ? (
    //           <div className="flex flex-col relative">
    //             <div
    //               className="flex gap-3 cursor-pointer"
    //               onClick={handleDropdown}
    //             >

    //               <img
    //                 src={(session.user.image as string)}
    //                 alt="profile"
    //                 width="32px"
    //                 height="32px"
    //                 className="rounded-full"
    //               />
    //               <span className="my-auto text-[14px] font-bold">
    //                 {session?.user.name}
    //               </span>
    //               <FaAngleDown size={18} className="my-auto" />
    //             </div>
    //             {dropdown && (
    //               <div className="absolute top-10 right-0 bg-red-500 z-20 w-[200px]">
    //                 {session?.user.email}
    //               </div>
    //             )}
    //           </div>
    //         ) : (
    //           <AuthButton title="login" to="/login" />
    //         )}
    //       </div>
    //       <div className="my-auto hidden md:flex">
    //         {session?.user ? (
    //           <div>nothing</div>
    //         ) : (
    //           <AuthButton title="register" to="/register" />
    //         )}
    //       </div>
    //     </div>
    //   </nav>
    // </main>

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
            {session?.user || userInfos?.email ? (
              <div className="flex flex-col relative">
                <div
                  className="flex gap-3 cursor-pointer"
                  onClick={handleDropdown}
                >
                  <img
                    src={
                      (session?.user?.image || userInfos?.image || "") as string
                    }
                    alt="profile"
                    width="32px"
                    height="32px"
                    className="rounded-full"
                  />
                  <span className="my-auto text-[14px] font-bold">
                    {session?.user?.name ||
                      `${userInfos?.userName}`}
                  </span>
                  <FaAngleDown size={18} className="my-auto" />
                </div>
                {dropdown && (
                  <div className="absolute top-10 right-0 bg-white z-20 w-[200px] flex flex-col gap-[5px] text-[14px] rounded-sm border border-1">
                    <small className="bg-[#F4F4F4] uppercase px-4 nav-dropdown py-1">Explore</small>
                    <div className="px-4 nav-dropdown">My library</div>
                    <div className="px-4 nav-dropdown">Recommendation</div>
                    <div className="px-4 nav-dropdown">Game Jams</div>
                    {/* <div className="px-4 nav-dropdown">{session?.user?.email || userInfos?.email}</div> */}
                    <small className="bg-[#F4F4F4] uppercase px-4 nav-dropdown py-1">Create</small>
                    <div className="px-4 nav-dropdown">Dashboard</div>
                    <div className="px-4 nav-dropdown">Posts</div>
                    <div className="px-4 nav-dropdown">Upload new project</div>
                    <div className="px-4 nav-dropdown">Host game jam</div>
                    <small className="bg-[#F4F4F4] uppercase px-4 nav-dropdown py-1">Account</small>
                    <div className="px-4 nav-dropdown">View profile</div>
                    <div className="px-4 nav-dropdown">Settings</div>
                    <div className="px-4 nav-dropdown" onClick={handleLogout}>logout</div>
                  </div>
                )}
              </div>
            ) : (
              <AuthButton title="login" to="/login" />
            )}
          </div>
          <div className="my-auto hidden md:flex">
            {session?.user || userInfos?.email ? (
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
