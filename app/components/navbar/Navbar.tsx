"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
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
import { IoMdNotifications } from "react-icons/io";
import PingLoader from "../PingLoader";
import Link from "next/link";
import { SnackbarProvider, useSnackbar } from "notistack";
import { io, Socket } from "socket.io-client";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext
import ThemeToggle from "@/app/components/ThemeToggle";
import { Game } from "@/app/types/homePage/games";

interface AuthState {
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  userName?: string;
  image: string;
  profilePicture?: string;
  incomingFriendRequests: any[];
  friendRequestCount: number;
}

interface NavbarProps {
  onSearch: (query: string) => void; // Callback function for search action
  suggestions: Game[];
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, suggestions }) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp onSearch={onSearch} suggestions={suggestions} />
    </SnackbarProvider>
  );
};

function MyApp({ onSearch, suggestions }: NavbarProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthState | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuBackdropRef = useRef<HTMLDivElement>(null);
  const [friendRequestCount, setFriendRequestCount] = useState<number>(0);
  const socket = useRef<Socket | null>(null);
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

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
          enqueueSnackbar(response.data.message, { variant: "success" });
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`/api/prompt/dashboard`);
        if (response.data.success === true) {
          setToken(true);
          setUserData(response.data.user);
          setFriendRequestCount(response.data.user.friendRequestCount);
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, friendRequestCount]);

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

  useEffect(() => {
    socket.current = io();

    if (socket.current) {
      socket.current.on("newFriendRequest", () => {
        setFriendRequestCount((prevCount) => prevCount + 1);
      });

      socket.current.on("updateFriendRequestCount", (count: number) => {
        setFriendRequestCount(count);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <main>
      <nav
        className={`w-full flex px-5 py-3 shadow-md justify-between md:gap-8 lg:justify-between fixed z-50 top-0 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex gap-5">
          <MenuIcon
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <Logo />
        </div>
        <Links />

        {isMobileMenuOpen && (
          <div className="dropdown-backdrop fixed top-[62px] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={mobileMenuBackdropRef}>
              <Dropdown
                links={links}
                links2={links2}
                isMobileMenuOpen={isMobileMenuOpen}
                onSearch={onSearch}
                suggestions={suggestions}
              />
            </div>
          </div>
        )}

        <SearchBox
          onSearch={onSearch}
          suggestions={suggestions}
          ClassName={`hidden md:flex`}
          Placeholder={`Search for games or creator`}
          inputClassName={`text-[14px] px-3 h-[30px] ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-black"
          } my-auto`}
        />
        <div className="flex gap-8">
          {userData && userData.incomingFriendRequests && (
            <Link
              className="flex relative cursor-pointer my-auto hover:bg-gray-200 "
              href={`/${userData?.userName}/notifications?status=all`}
            >
              <IoMdNotifications size={25} className="my-auto " />
              <small className="absolute flex items-center justify-center rounded-full p-1 bg-red-500 text-white text-[10px] w-4 h-4 top-2 right-1 transform translate-x-1/2 -translate-y-1/2">
                {userData.friendRequestCount}
              </small>
            </Link>
          )}
          <div className="my-auto flex">
            {userData && token ? (
              loading ? (
                <div className="flex flex-col relative">
                  <div className="flex gap-3 cursor-pointer">
                    <PingLoader />
                    <div
                      className={`bg-gray-100 p-2 rounded-lg border cursor-pointer ${
                        dropdownOpen ? "border-blue-500" : ""
                      } `}
                      onClick={handleDropdownToggle}
                    >
                      {dropdownOpen ? (
                        <FaAngleUp size={18} className="my-auto " />
                      ) : (
                        <FaAngleDown size={18} className="my-auto" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col relative">
                  <div className="flex gap-3">
                    <Link
                      href={`/${userData?.userName}`}
                      className={`flex gap-2 cursor-pointer my-auto ${
                        theme === "dark"
                          ? "hover:bg-gray-600"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {userData?.profilePicture ? (
                        <Image
                          src={userData?.profilePicture}
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
                        {userData?.userName && userData.userName.length > 8
                          ? `${userData.userName.slice(0, 8)}...`
                          : userData.userName}
                      </span>
                    </Link>

                    <div
                      className={`${
                        theme === "dark" ? "hover:bg-gray-600" : "bg-gray-100"
                      } p-2 rounded-lg border cursor-pointer ${
                        dropdownOpen ? "border-blue-500" : ""
                      } `}
                      onClick={handleDropdownToggle}
                    >
                      {dropdownOpen ? (
                        <FaAngleUp size={18} className="my-auto " />
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
                          username={userData?.userName || ""}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <AuthButton title="login" to="/login" />
            )}
          </div>
          <div className="my-auto hidden md:flex">
            {userData && token ? (
              <></>
            ) : (
              <AuthButton title="register" to="/register" />
            )}
          </div>
          <div className={`my-auto ${userData ? "ml-[-20px]" : ""}`}>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
