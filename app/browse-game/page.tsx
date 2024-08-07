"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { useSearch } from "@/app/lib/SearchContext";


const BrowseGamePage: React.FC = () => {
  const { handleSearch, suggestions } = useSearch();

  return (
    <div
      className={`min-h-screen py-[100px] dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900 `}
    >
            <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 `}
      >
        <h3
          className={`border-b md:text-[20px] pb-[30px] dark:border-gray-700 dark:text-white border-gray-300 text-[#434343] font-bold`}
        >
          Browse Games
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseGamePage;
