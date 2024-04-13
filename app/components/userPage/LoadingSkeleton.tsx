import React from "react";
import Navbar from "../navbar/Navbar";

const LoadingSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="text-center">
                <div className="rounded-full bg-gray-300 h-24 w-24 mx-auto mb-4" />
                <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
              </div>
              <div className="mt-8">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-1/4" />
                </div>
                <div className="flex justify-between mt-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            </div>
            <div className="mt-8 hidden md:flex flex-col">
              {/* Notifications Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {/* Add notifications component skeleton */}
              </div>
              {/* Settings Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                {/* Add settings component skeleton */}
              </div>
              {/* Profile Summary Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                {/* Add profile summary component skeleton */}
              </div>
              {/* Photos Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                {/* Add photos component skeleton */}
              </div>
              {/* Albums Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Albums</h2>
                {/* Add albums component skeleton */}
              </div>
              {/* Activities Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Activities</h2>
                {/* Add activities component skeleton */}
              </div>
              {/* Friends Skeleton */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Friends</h2>
                {/* Add friends list component skeleton */}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            {/* Posts Skeleton */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
              {/* Loading skeleton for posts */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white mb-4 p-4 rounded-lg shadow-md "
                >
                  <div className="flex items-center mb-2">
                    <div className="relative w-8 h-8 mr-2 bg-gray-300 rounded-full"></div>
                    <p className="text-[12px] text-gray-700 font-semibold bg-gray-300 h-4 w-24 rounded"></p>
                  </div>
                  <p className="text-gray-700 bg-gray-300 h-4 rounded"></p>
                  <hr className="my-4 border-gray-300" />
                  <div className="flex justify-between items-center mt-2 px-4 text-gray-500">
                    <button className="text-[8px] bg-gray-300 h-6 w-16 rounded"></button>
                    <button className="text-[8px] bg-gray-300 h-6 w-20 rounded"></button>
                    <button className="text-[8px] bg-gray-300 h-6 w-20 rounded"></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
