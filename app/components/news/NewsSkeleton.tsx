import React from "react";

const NewsSkeleton: React.FC = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-300 animate-pulse">
          <div className="h-48 bg-gray-400"></div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-400 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;
