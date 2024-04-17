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
import ProfileDropdown from "./ProfileDropdown";
import axios from "axios";
import avatar from "../../../public/images/robot.png";
import { useRouter } from "next/navigation";
import Backdrop from "@mui/material/Backdrop";
import { IoMdNotifications } from "react-icons/io";
// import { useSelector } from "react-redux";

interface AuthState {
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  userName?: string;
  image: string;
  profilePicture?: string;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);
  // const userInfo = useSelector((state: any) => state.auth.userInformation);

  const [userInfo, setUserInfo] = useState<AuthState | null>(null);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthState | null>(null);
  const router = useRouter();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      if (session) {
        const response = await axios.post(`/api/outuser`);

        if (response.status === 200) {
          console.log(response.data.message);
          await signOut();
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle network errors or other exceptions
    }
  };

  useEffect(() => {
    //  console.log("session", session)
    // const token = cookies.get("authToken");

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.post(`/api/prompt/dashboard`);

        console.log(response);

        if (response.data.success === true) {
          setToken(true);
          setUserData(response.data.user);
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
      <nav className="w-full flex px-5 py-3 shadow-md justify-between md:gap-8 lg:justify-between bg-white fixed z-50 top-0">
        <div className="flex gap-5">
          <MenuIcon
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <Logo />
        </div>
        <Links />
        <Backdrop
          open={isMobileMenuOpen}
          onClick={() => setMobileMenuOpen(false)}
          className="bg-black bg-opacity-50"
        >
          <Dropdown
            links={links}
            links2={links2}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </Backdrop>

        <SearchBox ClassName={`hidden md:flex`} />
        <div className="flex gap-8">
          <IoMdNotifications size={25} className="my-auto"/>
          <div className="my-auto flex">
            {userData && token ? (
              loading ? (
                <div className="flex flex-col relative">
                  <div className="flex gap-3 cursor-pointer" onClick={handleDropdown}>
                    <div className="rounded-full bg-gray-300 h-8 w-8 mx-auto mb-2"></div>
                    <span className="my-auto text-[14px] font-bold">
                      ...
                    </span>
                    <FaAngleDown size={18} className="my-auto" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col relative">
                  <div className="flex gap-3 cursor-pointer" onClick={handleDropdown}>
                    {UserDate?.profilePicture ? (
                      <Image
                        src={
                          ((UserDate?.profilePicture) as string
                        }
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
                    <span className="my-auto text-[14px] font-bold">{userData?.userName || ""}</span>
                    <FaAngleDown size={18} className="my-auto" />
                  </div>
                  {dropdown && (
                    <ProfileDropdown
                      handleClick={handleLogout}
                      username={userData?.userName || ""}
                    />
                  )}
                </div>
              )
            ) : (
              <AuthButton title="login" to="/login" />
            )}
          </div>
          <div className="my-auto hidden md:flex">
            {userData && token ? (
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
