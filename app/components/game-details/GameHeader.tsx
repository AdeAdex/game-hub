import React from "react";
import Image from "next/image";

interface GameHeaderProps {
  name: string;
  backgroundImage: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ name, backgroundImage }) => (
  <>
    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-red-500">
      {name}
    </h1>
    <div className="relative w-full h-64 sm:h-[24rem] mb-6">
      <Image
        src={backgroundImage}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  </>
);

export default GameHeader;
