import Navbar from "@/app/components/login/Navbar";
import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <main className="w-full bg-[#F4F4F4] md:h-screen">
      <Navbar />
      {children}
    </main>
  );
};

export default LoginLayout;
