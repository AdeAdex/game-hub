import React, { useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "@/app/lib/ThemeContext";

interface GameHeaderProps {
  name: string;
  backgroundImage: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ name, backgroundImage }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <h1 className={`text-3xl sm:text-4xl font-bold mb-6 text-center ${theme === "dark" ? "text-red-500" : "text-red-600"}`}>
        {name}
      </h1>
      <div className="relative w-full h-64 sm:h-[24rem] mb-6">
        <Image
          src={backgroundImage}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    </>
  );
};

export default GameHeader;
