import React from "react";
import Navbar from "@/app/components/navbar/Navbar"; // Import your Navbar component here
import { useSearch } from "@/app/lib/SearchContext";


const PostSkeleton = () => {
  const { handleSearch, suggestions } = useSearch();

  return (
    <div className={`dark:bg-gray-900 bg-gray-100 min-h-screen`}>
            <Navbar onSearch={handleSearch} suggestions={suggestions} />
{" "}
      {/* Include the Navbar component */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        {/* Post Skeleton */}
        <div
          className={`dark:bg-gray-800 bg-white mb-4 p-4 rounded-lg shadow-md animate-pulse`}
        >
          <div className="flex justify-between">
            <div className="flex items-center mb-2 w-[80%]">
              <div
                className={`dark:bg-gray-700 bg-gray-300 w-8 h-8 rounded-full mr-2`}
              ></div>
              <div
                className={`dark:text-gray-200 text-gray-700 text-[12px] font-semibold`}
              >
                <div
                  className={`dark:bg-gray-700 bg-gray-300 w-16 h-4 mb-1`}
                ></div>
                <div className="flex gap-1">
                  <small
                    className={`dark:bg-gray-700 bg-gray-300 flex justify-between text-[10px] w-12`}
                  ></small>
                </div>
              </div>
            </div>
            <div
              className={`dark:bg-gray-700 bg-gray-300 w-6 h-6 rounded-full cursor-pointer`}
            ></div>
          </div>
          <p className={`dark:text-gray-200 text-gray-700 mb-2`}>
            <small
              className={`dark:bg-gray-700 bg-gray-300 text-[14px] w-3/4 h-3`}
            ></small>
          </p>
          <div className={`dark:bg-gray-700 bg-gray-300 w-full h-64`}></div>
          <div className="flex justify-between items-center mt-2 px-4 text-gray-500 text-[12px]">
            <small
              className={`dark:bg-gray-700 bg-gray-300 cursor-pointer w-16`}
            ></small>
            <small
              className={`dark:bg-gray-700 bg-gray-300 cursor-pointer w-12`}
            ></small>
          </div>
          <hr className={`dark:border-gray-700 border-gray-300 my-2`} />
          <div className="flex justify-between items-center mt-2 px-4 text-gray-500">
            <button
              className={`dark:bg-gray-700 bg-gray-300 text-[8px] w-12 h-6`}
            ></button>
            <button
              className={`dark:bg-gray-700 bg-gray-300 text-[8px] w-16 h-6`}
            ></button>
            <button
              className={`dark:bg-gray-700 bg-gray-300 text-[8px] w-12 h-6`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
