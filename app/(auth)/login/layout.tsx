import Navbar from "@/app/components/login/Navbar";
import Footer from "@/app/components/footer/Footer";
import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <main className="w-full bg-[#F4F4F4] md:h-screen">
      <Navbar />
      {children}
      <Footer/>
    </main>
  );
};

export default LoginLayout;
