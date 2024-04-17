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
            {/* Post Input Skeleton */}
<div className="flex gap-2 bg-white mb-4 p-4 rounded-lg shadow-md mt-6 ">
  {/* Profile Picture Skeleton */}
  <div className="relative w-8 h-8 mr-2 bg-gray-300 rounded-full">
    {/* Profile Picture Image Skeleton */}
    <div className="relative w-10 h-10 mr-2 bg-gray-300 rounded-full"></div>
  </div>
  {/* Input Skeleton */}
  <div className="flex-1">
    <input
      type="text"
      placeholder="What's on your mind"
      className="hover:bg-gray-200 bg-gray-100 cursor-pointer rounded-lg py-2 px-3 w-full focus:outline-none focus:border-none"
    />
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
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 mr-4 bg-gray-300 rounded-full"></div>
          <div>
            <div className="text-gray-700 bg-gray-300 h-3 w-24 mb-2 rounded"></div>
            <div className="text-gray-500 bg-gray-300 h-2 w-20 rounded"></div>
          </div>
        </div>
        <div className="text-gray-700 bg-gray-300 h-3 mb-4 rounded"></div>
        {/* Loading skeleton for image or media carousel */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-300 mb-4"></div>
        <div className="flex justify-between items-center text-gray-500">
          <div className="flex">
            <button className="text-[8px] bg-gray-300 h-6 w-16 rounded mr-2"></button>
            <button className="text-[8px] bg-gray-300 h-6 w-16 rounded mr-2"></button>
            <button className="text-[8px] bg-gray-300 h-6 w-16 rounded"></button>
          </div>
          <div>
            <button className="text-[8px] bg-gray-300 h-6 w-16 rounded mr-2"></button>
            <button className="text-[8px] bg-gray-300 h-6 w-16 rounded mr-2"></button>
          </div>
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
