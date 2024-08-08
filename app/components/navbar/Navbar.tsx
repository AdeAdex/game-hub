//  app/components/navbar/Navbar.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import Links from "./links/Links";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import AuthButton from "./AuthButton";
import MenuIcon from "./MenuIcon";
import { links, links2 } from "@/app/lib/SideBarLinks";
import Dropdown from "./links/Dropdown";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import ProfileDropdown from "./ProfileDropdown";
import axios from "axios";
import avatar from "../../../public/images/robot.png";
import Link from "next/link";
import { SnackbarProvider, useSnackbar } from "notistack";
import { io, Socket } from "socket.io-client";
import ThemeToggle from "@/app/components/ThemeToggle";
import { Game } from "@/app/types/homePage/games";
import { useSearch } from "@/app/lib/SearchContext";
import NotificationIcon from "./NotificationIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { UserDataType } from "@/app/types/user";
import { persistStore } from 'redux-persist';
import { store } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/redux/authSlice';


interface NavbarProps {
  onSearch: (query: string) => void; // Callback function for search action
  // suggestions: Game[];
  suggestions: { game: Game; matchType: string }[];
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp />
    </SnackbarProvider>
  );
};

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const { searchQuery, setSearchQuery, suggestions, handleSearch } =
    useSearch();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuBackdropRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket | null>(null);
  const userInformation = useSelector(
    (state: RootState) => state.auth.userInformation
  ) as UserDataType | null;
  const dispatch = useDispatch();
  

 

  const handleDropdownToggle = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = async () => {
    try {
      if (session) {
        const response = await axios.post(`/api/outuser`);

        if (response.status === 200) {
          console.log(response.data.message);
          await signOut();
          persistStore(store).purge();
        dispatch(logout());
          enqueueSnackbar(response.data.message, { variant: "success" });

        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)) ||
        (mobileMenuBackdropRef.current &&
          !mobileMenuBackdropRef.current.contains(event.target as Node))
      ) {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <nav
        className={`w-full flex px-5 py-3 shadow-md justify-between md:gap-8 lg:justify-between fixed z-50 top-0 dark:bg-gray-900 dark:text-white bg-white text-black `}
      >
        <div className="flex gap-3 md:gap-5">
          <MenuIcon
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <Logo />
        </div>
        <Links ClassName={` hidden md:flex `} />

        {isMobileMenuOpen && (
          <div className="dropdown-backdrop fixed top-[62px] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={mobileMenuBackdropRef}>
              <Dropdown
                links={links}
                links2={links2}
                isMobileMenuOpen={isMobileMenuOpen}
                onSearch={handleSearch}
                suggestions={suggestions}
              />
            </div>
          </div>
        )}

        <SearchBox
          onSearch={handleSearch}
          suggestions={suggestions}
          ClassName={`hidden md:flex`}
          Placeholder={`Search for games or creator`}
          inputClassName={`text-[14px] px-3 h-[30px] dark:bg-gray-800 dark:text-white bg-gray-200 text-black my-auto`}
        />
        <div className="flex gap-3 md:gap-8">
          {userInformation && (
            // <Link
            //   className="flex relative cursor-pointer my-auto dark:hover:bg-gray-600 hover:bg-gray-200 dark:bg-transparent bg-gray-100 rounded-md "
            //   href={`/${userInformation?.userName}/notifications?status=all`}
            // >
            //   <IoMdNotifications size={25} className="my-auto " />
            //   <small className="absolute flex items-center justify-center rounded-full p-1 bg-red-500 text-white text-[10px] w-4 h-4 top-2 right-1 transform translate-x-1/2 -translate-y-1/2">
            //     {userInformation.friendRequestCount}
            //   </small>
            // </Link>

            <NotificationIcon
              userName={userInformation.userName}
              friendRequestCount={userInformation.incomingFriendRequests?.length}
              messageCount={userInformation.messages?.length}
              hasPayments={userInformation.payments?.length}
            />
          )}
          <div className="my-auto flex">
            {userInformation ? (
              <div className="flex flex-col relative">
                <div className="flex gap-3">
                  <Link
                    href={`/${userInformation?.userName}`}
                    className={`flex gap-2 cursor-pointer my-auto dark:hover:bg-gray-600 hover:bg-gray-200 `}
                  >
                    {userInformation?.profilePicture ? (
                      <Image
                        src={userInformation?.profilePicture}
                        alt="profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src={avatar}
                        alt="profile"
                        width={32}
                        height={32}
                        className="rounded-full border border-gray-500"
                      />
                    )}
                    <span className="my-auto text-[14px] font-bold overflow-hidden whitespace-nowrap max-w-[80px]">
                      {userInformation?.userName &&
                      userInformation.userName.length > 8
                        ? `${userInformation.userName.slice(0, 8)}...`
                        : userInformation.userName}
                    </span>
                  </Link>

                  <div
                    className={`dark:hover:bg-gray-600 hover:bg-gray-200 dark:bg-transparent bg-gray-100 flex my-auto p-1 md:p-2 rounded-lg border cursor-pointer ${
                      dropdownOpen ? "dark:border-blue-500" : ""
                    } `}
                    onClick={handleDropdownToggle}
                  >
                    {dropdownOpen ? (
                      <FaAngleUp size={18} className="my-auto" />
                    ) : (
                      <FaAngleDown size={18} className="my-auto" />
                    )}
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={dropdownRef} className="profile-dropdown">
                      <ProfileDropdown
                        handleClick={handleLogout}
                        username={userInformation?.userName || ""}
                        email={userInformation?.email || ""}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <AuthButton title="login" to="/login" />
            )}
          </div>
          <div className="my-auto hidden md:flex">
            {userInformation ? (
              <></>
            ) : (
              <AuthButton title="register" to="/register" />
            )}
          </div>
          <div className={`my-auto ${userInformation ? "ml-[-5px]" : ""}`}>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
