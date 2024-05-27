// /app/components/CardSkeleton.tsx

"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

const CardSkeleton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full md:w-[30%] lg:w-[19%] h-[320px] rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative w-full h-[65%] animate-pulse">
        <div
          className={`absolute w-full h-full ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        />
        <div className="absolute bottom-0 left-0 p-2 flex flex-wrap bg-black bg-opacity-50 w-full overflow-hidden">
          <div
            className={`w-6 h-6 rounded-full ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-300"
            } mx-1`}
          />
          <div
            className={`w-6 h-6 rounded-full ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-300"
            } mx-1`}
          />
          <div
            className={`w-6 h-6 rounded-full ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-300"
            } mx-1`}
          />
        </div>
      </div>
      <div className="p-4 relative h-[35%] overflow-y-auto custom-scrollbar whitespace-nowrap">
        <div
          className={`animate-pulse h-6 w-3/4 mb-2 rounded ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-200"
          }`}
        />
        <div className="flex">
          <div
            className={`animate-pulse h-4 w-1/4 mr-2 rounded ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-200"
            }`}
          />
          <div
            className={`animate-pulse h-4 w-1/4 rounded ${
              theme === "dark" ? "bg-gray-600" : "bg-gray-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
 
