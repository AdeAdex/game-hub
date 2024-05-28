import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onSearch={(query) => {}} suggestions={[]}/>
      <div className="flex-grow container mx-auto px-4 py-16 md:py-20">
        {/* Loading User Profile and Flow Diagram */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Loading User Profile */}
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8 md:mb-0 md:w-1/3 lg:w-1/4 text-center">
            <div className="animate-pulse space-y-6">
              <div className="mx-auto rounded-full w-32 h-32 relative overflow-hidden border-4 border-gray-300 bg-gray-200"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="flex justify-center space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>

          {/* Loading Flow Diagram */}
          <div className="bg-white shadow-lg rounded-lg p-8 flex-1 md:max-w-full">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-80 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Loading Activities */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </li>
              <li className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </li>
              <li className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingSkeleton;
