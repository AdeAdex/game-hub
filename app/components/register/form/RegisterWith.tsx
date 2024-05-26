"use client";

import React, { useState, useContext } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { ThemeContext } from "@/app/lib/ThemeContext";

const RegisterWith = () => {
  const [dropdown, setDropdown] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleGithubSignIn = async () => {
    await signIn("github");
  };

  return (
    <div
      className={`text-[14px] rounded-sm absolute top-0 right-0 z-10 ${dropdown ? "border" : ""}`}
    >
      <div className={`py-2 px-4 ${dropdown ? theme === "dark" ? "bg-gray-700" : "bg-[#F4F4F4]" : ""}`}>
        <button className="flex gap-[10px]" onClick={handleDropdown}>
          <span>Other registration methods</span>
          {dropdown ? (
            <TfiAngleUp size={12} className="my-auto" />
          ) : (
            <TfiAngleDown size={12} className="my-auto" />
          )}
        </button>
      </div>
      {dropdown && (
        <div className={`p-3 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <button
            className={`rounded-sm py-1 px-2 border flex gap-3 ${theme === "dark" ? "border-gray-600" : "border-red-500"}`}
            onClick={handleGithubSignIn}
          >
            <FaGithub size={25} />{" "}
            <span className={`my-auto font-bold ${theme === "dark" ? "text-gray-300" : "text-red-500"}`}>
              Register with GitHub
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterWith;
