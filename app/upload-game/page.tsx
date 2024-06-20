"use client";

import React, { useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";

const UploadGamePage: React.FC = () => {
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
          Upload Your Game
        </h3>
        <div className="mt-4">
          <form className="space-y-4">
            <input type="text" placeholder="Game Title" className="w-full px-4 py-2 border rounded"/>
            <textarea placeholder="Game Description" className="w-full px-4 py-2 border rounded h-32"></textarea>
            <input type="file" className="w-full px-4 py-2 border rounded"/>
            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">Upload</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadGamePage;
