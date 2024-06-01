import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";

interface GameDescriptionProps {
  name_original: string;
  description_raw: string;
  released: string;
  tba: boolean;
  updated: string;
}

const GameDescription: React.FC<GameDescriptionProps> = ({
  name_original,
  description_raw,
  released,
  tba,
  updated,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <p className={`text-lg sm:text-xl font-semibold mt-4 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
        <strong className={`${theme === "dark" ? "text-white" : "text-black"}`}>Original Name:</strong> {name_original}
      </p>
      <p className={`border-b-2 pb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        <strong>Description:</strong> {description_raw}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Released:</strong> {released} {tba && "(To be announced)"}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Last Updated:</strong> {new Date(updated).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default GameDescription;
