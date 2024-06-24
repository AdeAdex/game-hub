// LoadingSkeleton.tsx
import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

const LoadingSkeleton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
