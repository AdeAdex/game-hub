import React from "react";

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
}) => (
  <>
    <p className="text-lg sm:text-xl text-gray-200 font-semibold mt-4">
      <strong className="text-white">Original Name:</strong> {name_original}
    </p>
    <p className="text-gray-400 border-b-2 pb-3">
      <strong>Description:</strong> {description_raw}
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
      <p className="text-gray-400">
        <strong>Released:</strong> {released} {tba && "(To be announced)"}
      </p>
      <p className="text-gray-400">
        <strong>Last Updated:</strong> {new Date(updated).toLocaleString()}
      </p>
    </div>
  </>
);

export default GameDescription;
