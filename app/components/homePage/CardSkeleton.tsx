// /app/components/CardSkeleton.tsx
"use client";

import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[320px] rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="relative w-full h-[65%] animate-pulse">
        <div className="absolute w-full h-full bg-gray-200 dark:bg-gray-700" />
        <div className="absolute bottom-0 left-0 p-2 flex flex-wrap bg-black bg-opacity-50 w-full overflow-hidden">
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 mx-1" />
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 mx-1" />
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 mx-1" />
        </div>
      </div>
      <div className="p-4 relative h-[35%] overflow-y-auto custom-scrollbar whitespace-nowrap">
        <div className="animate-pulse h-6 w-3/4 mb-2 rounded bg-gray-200 dark:bg-gray-600" />
        <div className="flex">
          <div className="animate-pulse h-4 w-1/4 mr-2 rounded bg-gray-200 dark:bg-gray-600" />
          <div className="animate-pulse h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
