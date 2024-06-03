"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/app/lib/ThemeContext";

const AboutYou = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`flex flex-col gap-[25px] ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className={`border rounded-sm py-3 px-4 flex flex-col gap-[10px] ${theme === "dark" ? "border-gray-600" : "border-[#CDCDCD]"}`}>
        <h3>About you</h3>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="checkbox1" />
          <span className="my-auto">I'm interested in playing or downloading games on adex</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="checkbox2" />
          <span className="my-auto">I'm interested in distributing content on Adex gameHub </span>
        </div>
        <div>You can change your responses to these questions later, they are used to hint adex.co in how it should present itself to you.</div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="checkbox3" />
          <span className="my-auto">Sign me up for the bi-monthly adex digest newsletter</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="checkbox4" />
          <div className="my-auto flex gap-1">
            <span className="my-auto">I accept the </span>
            <Link href="/terms-condition" className={`my-auto underline ${theme === "dark" ? "text-red-300" : "text-red-500"}`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutYou;
