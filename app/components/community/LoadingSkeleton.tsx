import React from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

const LoadingSkeleton: React.FC<{ type: "discussion" | "contributor" }> = ({ type }) => {
  const { theme } = React.useContext(ThemeContext);

  const skeletonClasses = `animate-pulse bg-${theme === "dark" ? "gray-700" : "white"} border rounded-md p-4 w-full`;

  if (type === "discussion") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={skeletonClasses}>
            <div className={`h-4 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded mb-2 w-[30%]`}></div>
            <div className={`h-3 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded mb-2 w-[30%]`}></div>
            <div className={`h-3 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded mb-2 w-[30%]`}></div>
            <div className="text-right">
              <div className={`h-3 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded inline-block w-1/4`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (type === "contributor") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={skeletonClasses}>
            <div className={`h-4 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded mb-2 w-1/2`}></div>
            <div className={`h-3 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded mb-2 w-full`}></div>
            <div className={`h-3 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded mb-2 w-3/4`}></div>
            <div className="text-right">
              <div className={`h-3 bg-${theme === "dark" ? "gray-600" : "gray-300"} rounded inline-block w-1/3`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
