import React from 'react';
import Navbar from '@/app/components/navbar/Navbar'; // Import your Navbar component here

const PostSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar /> {/* Include the Navbar component */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        {/* Post Skeleton */}
        <div className="bg-white mb-4 p-4 rounded-lg shadow-md animate-pulse">
          <div className="flex justify-between">
            <div className="flex items-center mb-2 w-[80%]">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className="text-[12px] text-gray-700 font-semibold">
                <div className="w-16 h-4 bg-gray-300 mb-1"></div>
                <div className="flex gap-1">
                  <small className="flex justify-between text-[10px] w-12 bg-gray-300"></small>
                </div>
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full cursor-pointer"></div>
          </div>
          <p className="text-gray-700 mb-2">
            <small className="text-[14px] bg-gray-300 w-3/4 h-3"></small>
          </p>
          <div className="w-full h-64 bg-gray-300"></div>
          <div className="flex justify-between items-center mt-2 px-4 text-gray-500 text-[12px]">
            <small className="cursor-pointer w-16 bg-gray-300"></small>
            <small className="cursor-pointer w-12 bg-gray-300"></small>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between items-center mt-2 px-4 text-gray-500">
            <button className="text-[8px] bg-gray-300 w-12 h-6"></button>
            <button className="text-[8px] bg-gray-300 w-16 h-6"></button>
            <button className="text-[8px] bg-gray-300 w-12 h-6"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
