// @/app/components/featured-games/SkeletonLoader.tsx

import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md animate-pulse">
      <div className="flex flex-col items-center justify-center">
        <div className="w-40 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2"></div>
        <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-1"></div>
        <div className="w-36 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-1"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
