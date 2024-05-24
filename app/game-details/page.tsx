// /app/game-details/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';

interface Platform {
  id: number;
  slug: string;
  name: string;
}

interface EsrbRating {
  id: number;
  slug: string;
  name: string;
}

interface GameDetailsProps {
  count: number;
  next: string;
  previous: string;
  results: {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Record<string, unknown>;
    ratings_count: number;
    reviews_text_count: string;
    added: number;
    added_by_status: Record<string, unknown>;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: string;
    esrb_rating: EsrbRating;
    platforms: {
      platform: Platform;
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    }[];
  };
}

const GameDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams ? searchParams.get('id') : null;
  const [gameDetails, setGameDetails] = useState<GameDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameId) {
      const fetchGameDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get<GameDetailsProps>(`https://api.rawg.io/api/games/${gameId}`, {
            params: {
              key: '4e2c61f658d44adcb51ed39f710a9d71',
            },
          });
          setGameDetails(response.data);
        } catch (error) {
          console.error('Error fetching game details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchGameDetails();
    }
  }, [gameId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!gameDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">No game details found.</p>
      </div>
    );
  }

  const { results } = gameDetails;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center pt-10">
        {results.map((game) => (
          <div key={game.id}>
            <h1 className="text-4xl font-bold mb-6 text-center">{game.name}</h1>
            <div className="relative w-full h-80 mb-6">
              <Image
                src={game.background_image}
                alt={game.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="mb-4 text-lg text-gray-700">Released: {game.released}</p>
            <p className="mb-4 text-lg text-gray-700">Rating: {game.rating}</p>
            {game.esrb_rating && (
              <p className="mb-4 text-lg text-gray-700">ESRB Rating: {game.esrb_rating.name}</p>
            )}
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">Platforms</h2>
              <ul className="list-disc list-inside mb-6">
                {game.platforms.map((platform, index) => (
                  <li key={index} className="mb-2">
                    {platform.platform.name}
                    {platform.released_at && <span> - Released at: {platform.released_at}</span>}
                    {platform.requirements.minimum && <div>Minimum Requirements: {platform.requirements.minimum}</div>}
                    {platform.requirements.recommended && <div>Recommended Requirements: {platform.requirements.recommended}</div>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
      <Footer/>
    </div>
  );
};

export default GameDetails;
