// /app/[username]/library/page.tsx

"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { UserDataType } from "@/app/types/user";
import Loader from "@/app/components/Loader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface LibraryPageProps {
  params: {
    username: string;
  };
}

const LibraryPage: React.FC<LibraryPageProps> = ({ params }) => {
  const { username } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useContext(ThemeContext); // Use ThemeContext to get the current theme
  const [loading, setLoading] = useState<boolean>(false);
  const isFullScreen = useMediaQuery("(min-width:600px)");

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b md:text-[20px] pb-[30px] ${
            theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-[#434343]"
          } font-bold`}
        >
          Library Page Coming Soon
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default LibraryPage;
