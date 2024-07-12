"use client";

import Navbar from "@/app/components/login/Navbar";
import Footer from "@/app/components/footer/Footer";
import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <main className="w-full md:h-screen dark:bg-dark-mode bg-[#F4F4F4] text-black dark:text-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default LoginLayout;
