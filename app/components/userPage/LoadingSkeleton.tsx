import React, { useContext } from "react";
import Navbar from "../navbar/Navbar";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="rounded-lg shadow-lg p-6 animate-pulse bg-white dark:bg-gray-800">
              <div className="text-center">
                <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-24 w-24 mx-auto mb-4" />
                <div className="h-6 rounded bg-gray-300 dark:bg-gray-700 w-2/3 mx-auto mb-2" />
                <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 w-1/2 mx-auto" />
              </div>
              <div className="mt-8 md:hidden">
                <div className="flex justify-between">
                  <button className="py-1 px-2 rounded-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500" />
                  <button className="py-1 px-2 rounded-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500" />
                  <button className="py-1 px-2 rounded-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500" />
                  <button className="py-1 px-2 rounded-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-4 p-4 rounded-lg shadow-md mt-6 bg-white dark:bg-gray-800 text-black dark:text-white">
              <div className="relative w-8 h-8 mr-2 rounded-full bg-gray-300 dark:bg-gray-700">
                <div className="relative w-10 h-10 mr-2 rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  readOnly
                  placeholder="What's on your mind"
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded-lg py-2 px-3 w-full focus:outline-none focus:border-none text-black dark:text-white"
                />
              </div>
            </div>

            <div className="mt-8 hidden md:flex flex-col">
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {/* Add notifications component skeleton */}
              </div>
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                {/* Add settings component skeleton */}
              </div>
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                {/* Add profile summary component skeleton */}
              </div>
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                {/* Add photos component skeleton */}
              </div>
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Albums</h2>
                {/* Add albums component skeleton */}
              </div>
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Activities</h2>
                {/* Add activities component skeleton */}
              </div>
              <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">Friends</h2>
                {/* Add friends list component skeleton */}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-lg shadow-lg p-6 mb-8 animate-pulse bg-white dark:bg-gray-800">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 mr-4 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div>
                      <div className="h-3 w-24 mb-2 rounded bg-gray-300 dark:bg-gray-700" />
                      <div className="h-2 w-20 rounded bg-gray-300 dark:bg-gray-700" />
                    </div>
                  </div>
                  <div className="h-3 mb-4 rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-300 dark:bg-gray-700" />
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                    <div className="flex">
                      <button className="text-[8px] h-6 w-16 rounded mr-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600" />
                      <button className="text-[8px] h-6 w-16 rounded mr-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600" />
                      <button className="text-[8px] h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600" />
                    </div>
                    <div>
                      <button className="text-[8px] h-6 w-16 rounded mr-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600" />
                      <button className="text-[8px] h-6 w-16 rounded mr-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600" />
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
