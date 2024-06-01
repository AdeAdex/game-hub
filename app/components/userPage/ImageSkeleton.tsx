import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

const ImageSkeleton = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`animate-pulse rounded-full w-32 h-32 mx-auto ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
      }`}
    ></div>
  );
};

export default ImageSkeleton;
