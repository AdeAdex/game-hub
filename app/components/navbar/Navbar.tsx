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
import { FaAngleDown } from "react-icons/fa6";
// import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import axios from "axios";
import avatar from "../../../public/images/robot.png";
import { useRouter } from "next/navigation";

interface AuthState {
  // userInfo: {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  image: string;
  // };
  // token: string;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);
  // const userInfo = useSelector((state: any) => state.auth.userInformation);

  const [userInfo, setUserInfo] = useState<AuthState | null>(null);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      if (session) {
        // Sign out from Google or GitHub
        await signOut();
      } else {
        const response = await fetch("/api/outuser", {
          method: "POST", // Send a POST request to the logout endpoint
        });

        if (response.ok) {
          // Clear local session or perform any other necessary actions
          console.log("Logout successful");
          setUserInfo(null); // Clear user info
          setUserResponse(null); // Clear user response
          setLoading(true);
          router.push("login"); // Redirect the user to the login page or another page if needed
        } else {
          console.error("Logout failed:", response.statusText);
          // Handle logout failure
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle network errors or other exceptions
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/prompt/dashboard`);

        if (response.data.success === true) {
          setUserResponse(response.data);
          setUserInfo(response.data.user);
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, [session]);

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
            {session?.user || userInfo?.email ? (
              <div className="flex flex-col relative">
                <div
                  className="flex gap-3 cursor-pointer"
                  onClick={handleDropdown}
                >
                  {session?.user || userInfo?.image ? (
                    <Image
                      src={(session?.user?.image || userInfo?.image) as string}
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

                  <span className="my-auto text-[14px] font-bold">
                    {session?.user?.name || `${userInfo?.userName}`}
                  </span>
                  <FaAngleDown size={18} className="my-auto" />
                </div>
                {dropdown && (
                  <ProfileDropdown
                    handleClick={handleLogout} username={session?.user?.name || userInfo?.userName || ""}/*  ref={dropdownRef} */
                  />
                )}
              </div>
            ) : (
              <AuthButton title="login" to="/login" />
            )}
          </div>
          <div className="my-auto hidden md:flex">
            {session?.user || userInfo?.email ? (
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
