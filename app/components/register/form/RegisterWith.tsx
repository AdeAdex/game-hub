"use client";

import React, { useState } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const RegisterWith = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleAuthSignIn = async (provider: string) => {
    await signIn(provider);
  };

  return (
    <div
      className={`text-[14px] rounded-sm absolute top-0 right-0 z-10 ${
        dropdown ? "border" : ""
      }`}
    >
      <div
        className={`py-2 px-4 ${
          dropdown ? "dark:bg-gray-700 bg-[#F4F4F4]" : ""
        }`}
      >
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
        <div className="p-3 flex flex-col space-y-4 bg-white dark:bg-gray-800">
          <button
            className="rounded-sm py-1 px-2 border flex gap-3 border-red-500 dark:border-gray-600"
            onClick={() => handleAuthSignIn("google")}
          >
            <FcGoogle size={25} />
            <span className="my-auto font-bold text-red-500 dark:text-gray-300">
              Register with Google
            </span>
          </button>
          <button
            className="rounded-sm py-1 px-2 border flex gap-3 border-red-500 dark:border-gray-600"
            onClick={() => handleAuthSignIn("github")}
          >
            <FaGithub size={25} />
            <span className="my-auto font-bold text-red-500 dark:text-gray-300">
              Register with GitHub
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterWith;
