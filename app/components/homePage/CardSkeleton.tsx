// /app/components/CardSkeleton.tsx

"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

const CardSkeleton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`w-full md:w-[30%] lg:w-[19%] h-[300px] ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out mt-3`}>
      <div className={`animate-pulse relative w-100 h-[70%] ${theme === "dark" ? "bg-gray-700" : ""}`} />
      <div className="p-4">
        <div className={`animate-pulse h-6 w-3/4 mb-2 ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"} rounded`} />
        <div className={`animate-pulse h-4 w-1/2 ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"} rounded`} />
      </div>
    </div>
  );
};

export default CardSkeleton;
