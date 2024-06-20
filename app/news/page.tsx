"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";

const NewsPage: React.FC = () => {
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
          News
        </h3>
        <div className="mt-4">
          {/* Placeholder for news articles */}
          <div className="bg-gray-200 rounded-lg p-4 mb-4">News Article 1</div>
          <div className="bg-gray-200 rounded-lg p-4 mb-4">News Article 2</div>
          <div className="bg-gray-200 rounded-lg p-4 mb-4">News Article 3</div>
          {/* Add more news articles as needed */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
