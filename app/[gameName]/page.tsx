// pages/[gameName]/index.tsx

import { GetServerSideProps } from "next";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface GameDetailsProps {
  game: {
    id: number;
    name: string;
    description: string;
    background_image: string;
    released: string;
    rating: number;
    stores: { store: { name: string }, url: string }[];
  };
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 underline">Back to Home</Link>
      <h1 className="text-3xl font-bold my-4">{game.name}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image
          src={game.background_image || "/images/placeholder.png"}
          alt={game.name}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="rounded-lg"
        />
      </div>
      <p className="text-gray-700 mb-4">{game.description}</p>
      <p className="text-gray-700 mb-4">Released: {game.released}</p>
      <p className="text-gray-700 mb-4">Rating: {game.rating}</p>
      <div className="overflow-y-auto custom-scrollbar whitespace-nowrap">
        <h2 className="text-2xl font-semibold mb-2">Available on:</h2>
        {game.stores.map((store, index) => (
          <p key={index} className="relative">
            <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {store.store.name}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { gameName } = context.params as { gameName: string };

  try {
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: '4e2c61f658d44adcb51ed39f710a9d71',
        search: gameName,
      },
    });

    const game = response.data.results[0]; // Assuming the first result is the desired game

    return {
      props: { game },
    };
  } catch (error) {
    console.error('Error fetching game details:', error);
    return {
      notFound: true,
    };
  }
};

export default GameDetails;
