"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";

const BrowseGamePage: React.FC = () => {
  const { theme } = useContext(ThemeContext);

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
          Browse Games
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Replace with real game data */}
          <div className="bg-gray-200 rounded-lg p-4">Game 1</div>
          <div className="bg-gray-200 rounded-lg p-4">Game 2</div>
          <div className="bg-gray-200 rounded-lg p-4">Game 3</div>
          {/* Add more games as needed */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseGamePage;
