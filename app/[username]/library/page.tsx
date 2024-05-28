// /app/[username]/library/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { UserDataType } from "@/app/types/user";
import Loader from "@/app/components/Loader";
import useMediaQuery from "@mui/material/useMediaQuery";

interface LibraryPageProps {
  params: {
    username: string;
  };
}

const LibraryPage: React.FC<LibraryPageProps> = ({ params }) => {
  const { username } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const isFullScreen = useMediaQuery("(min-width:600px)");
  
  return (
    <div className="bg-gray-100 min-h-screen py-[100px]">
      <Navbar onSearch={(query) => {}} suggestions={[]}/>
      <div className="relative w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
        <h3 className="border-b border-gray-300 font-bold text-[#434343] md:text-[20px] pb-[30px]">
          Library Page Coming Soon 
          
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default LibraryPage;
