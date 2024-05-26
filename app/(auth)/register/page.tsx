"use client";

import React, { useContext } from "react";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Hero from "@/app/components/register/hero/Hero";
import RegisterForm from "@/app/components/register/form/RegisterForm";
import { ThemeContext } from "@/app/lib/ThemeContext";

const RegisterPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`w-full pt-[50px] md:pt-[75px] relative ${theme === "dark" ? "bg-gray-800" : "bg-[#F4F4F4]"}`}>
      <Navbar />
      <div className={`w-full lg:w-[60%] mx-auto mt-[1px] md:mt-6 ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-2 border-gray-300"} rounded-sm`}>
        <h3 className={`py-[30px] border-b ${theme === "dark" ? "border-gray-600 text-white" : "border-gray-300 text-[#434343]"} px-[10px] md:px-[30px] font-bold md:text-[20px]`}>
          Create an account on Adex
        </h3>
        <div className="w-full flex flex-col md:flex-row px-5 gap-[0px] md:gap-[50px]">
          <RegisterForm />
          <div className="border border-1 "></div>
          <Hero />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RegisterPage;
