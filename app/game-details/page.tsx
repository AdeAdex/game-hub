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

interface GameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: {
    metascore: number;
    url: string;
  }[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Record<string, unknown>;
  reactions: Record<string, unknown>;
  added: number;
  added_by_status: Record<string, unknown>;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: string;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  esrb_rating: EsrbRating;
  platforms: {
    platform: Platform;
    released_at: string;
    requirements: {
      minimum: string;
      recommended: string;
    };
  }[];
}

const GameDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams ? searchParams.get('id') : null;
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameId) {
      const fetchGameDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get<GameDetails>(`https://api.rawg.io/api/games/${gameId}`, {
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

  const {
    name,
    released,
    rating,
    esrb_rating,
    background_image,
    description,
    platforms,
  } = gameDetails;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8 mt-[60px]">
        <h1 className="text-4xl font-bold mb-6 text-center">{name}</h1>
        <div className="relative w-full h-80 mb-6">
          <Image
            src={background_image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <p className="mb-4 text-lg text-gray-700">Released: {released}</p>
        <p className="mb-4 text-lg text-gray-700">Rating: {rating}</p>
        {esrb_rating && (
          <p className="mb-4 text-lg text-gray-700">ESRB Rating: {esrb_rating.name}</p>
        )}
        <p className="mb-4 text-lg text-gray-700">Description: {description}</p>
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Platforms</h2>
          <ul className="list-disc list-inside mb-6">
            {platforms.map((platform, index) => (
              <li key={index} className="mb-2">
                <div className="text-lg font-medium">{platform.platform.name}</div>
                {platform.released_at && <div>Released at: {platform.released_at}</div>}
                {platform.requirements.minimum && <div>Minimum Requirements: {platform.requirements.minimum}</div>}
                {platform.requirements.recommended && <div>Recommended Requirements: {platform.requirements.recommended}</div>}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetails;
