"use client";

import Navbar from "@/app/components/login/Navbar";
import Footer from "@/app/components/footer/Footer";
import React, { ReactNode, useContext, useEffect } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode-content" : "bg-white";
  }, [theme]);

  return (
    <main className={`w-full md:h-screen ${theme === "dark" ? "text-white" : "text-black"}`}>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default LoginLayout;
