import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";
import Navbar from "../navbar/Navbar";

const LoadingSkeleton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div
              className={`rounded-lg shadow-lg p-6 animate-pulse ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="text-center">
                <div
                  className={`rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  } h-24 w-24 mx-auto mb-4`}
                />
                <div
                  className={`h-6 rounded ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  } w-2/3 mx-auto mb-2`}
                />
                <div
                  className={`h-4 rounded ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  } w-1/2 mx-auto`}
                />
              </div>
              {/* Mobile User Profile Section Skeleton */}
              <div className="mt-8 md:hidden">
                {/* Buttons Skeleton */}
                <div className="flex justify-between">
                  <button
                    className={`py-1 px-2 rounded-sm ${
                      theme === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  ></button>
                  <button
                    className={`py-1 px-2 rounded-sm ${
                      theme === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  ></button>
                  <button
                    className={`py-1 px-2 rounded-sm ${
                      theme === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  ></button>
                  <button
                    className={`py-1 px-2 rounded-sm ${
                      theme === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  ></button>
                </div>
              </div>
            </div>
            {/* Post Input Skeleton */}
            <div
              className={`flex gap-2 mb-4 p-4 rounded-lg shadow-md mt-6 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {/* Profile Picture Skeleton */}
              <div
                className={`relative w-8 h-8 mr-2 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                {/* Profile Picture Image Skeleton */}
                <div
                  className={`relative w-10 h-10 mr-2 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              </div>
              {/* Input Skeleton */}
              <div className="flex-1">
                <input
                  type="text"
                  readOnly
                  placeholder="What's on your mind"
                  className={`hover:${
                    theme === "dark" ? "bg-gray-600" : "bg-gray-200"
                  } ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  } cursor-pointer rounded-lg py-2 px-3 w-full focus:outline-none focus:border-none ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                />
              </div>
            </div>

            <div className="mt-8 hidden md:flex flex-col">
              {/* Notifications Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {/* Add notifications component skeleton */}
              </div>
              {/* Settings Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                {/* Add settings component skeleton */}
              </div>
              {/* Profile Summary Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                {/* Add profile summary component skeleton */}
              </div>
              {/* Photos Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                {/* Add photos component skeleton */}
              </div>
              {/* Albums Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Albums</h2>
                {/* Add albums component skeleton */}
              </div>
              {/* Activities Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Activities</h2>
                {/* Add activities component skeleton */}
              </div>
              {/* Friends Skeleton */}
              <div
                className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Friends</h2>
                {/* Add friends list component skeleton */}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            {/* Posts Skeleton */}
            <div
              className={`rounded-lg shadow-lg p-6 mb-8 animate-pulse ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Loading skeleton for posts */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg shadow-md ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`relative w-12 h-12 mr-4 rounded-full ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    ></div>
                    <div>
                      <div
                        className={`h-3 w-24 mb-2 rounded ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`h-2 w-20 rounded ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div
                    className={`h-3 mb-4 rounded ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                  {/* Loading skeleton for image or media carousel */}
                  <div
                    className={`aspect-w-16 aspect-h-9 mb-4 ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`flex justify-between items-center ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex">
                      <button
                        className={`text-[8px] h-6 w-16 rounded mr-2 ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        } hover:${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                        }`}
                      ></button>
                      <button
                        className={`text-[8px] h-6 w-16 rounded mr-2 ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        } hover:${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                        }`}
                      ></button>
                      <button
                        className={`text-[8px] h-6 w-16 rounded ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        } hover:${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                        }`}
                      ></button>
                    </div>
                    <div>
                      <button
                        className={`text-[8px] h-6 w-16 rounded mr-2 ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        } hover:${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                        }`}
                      ></button>
                      <button
                        className={`text-[8px] h-6 w-16 rounded mr-2 ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        } hover:${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                        }`}
                      ></button>
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
