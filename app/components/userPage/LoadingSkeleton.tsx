
"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          <div className="flex justify-between hover:bg-gray-200 dark:hover:bg-gray-700 mb-2 cursor-pointer py-1">
            <div className="flex items-center w-[80%]">
              <div className="relative w-8 h-8 mr-2">
                <Skeleton circle={true} height={32} width={32} />
              </div>
              <div className="text-[12px] font-semibold w-full">
                <Skeleton height={20} width={120} />
                <div className="flex gap-1">
                  <Skeleton height={14} width={80} />
                  <Skeleton height={14} width={20} />
                </div>
              </div>
            </div>
            <div className="hover:bg-gray-400 dark:hover:bg-gray-600 rounded-full p-3 cursor-pointer">
              <Skeleton circle={true} height={24} width={24} />
            </div>
          </div>
          <p className="mb-2">
            <Skeleton count={2} height={14} />
          </p>
          <div>
            <Skeleton height={200} width="100%" />
          </div>
          <div className="flex justify-between items-center mt-2 px-4 text-[12px]">
            <Skeleton height={20} width={60} />
            <Skeleton height={20} width={60} />
            <Skeleton height={20} width={60} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
