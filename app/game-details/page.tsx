// /app/game-details/page.tsx

'use client'

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

interface MetacriticPlatform {
  metascore: number;
  url: string;
}

interface GameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatform[];
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

const GameDetailsPage: React.FC = () => {
  const router = useSearchParams();
  const gameId = router ? router.get('id') : null;
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
    name_original,
    description,
    metacritic,
    metacritic_platforms,
    released,
    tba,
    updated,
    background_image,
    background_image_additional,
    website,
    rating,
    rating_top,
    ratings,
    reactions,
    added,
    added_by_status,
    playtime,
    screenshots_count,
    movies_count,
    creators_count,
    achievements_count,
    parent_achievements_count,
    reddit_url,
    reddit_name,
    reddit_description,
    reddit_logo,
    reddit_count,
    twitch_count,
    youtube_count,
    reviews_text_count,
    ratings_count,
    suggestions_count,
    alternative_names,
    metacritic_url,
    parents_count,
    additions_count,
    game_series_count,
    esrb_rating,
    platforms,
  } = gameDetails;

  return (
  <div className="min-h-screen bg-gray-900">
    <Navbar />
    <main className="text-white w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8 mt-[60px]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-red-500">{name}</h1>
      <div className="relative w-full h-64 sm:h-80 mb-6">
        <Image
          src={background_image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="space-y-4 text-sm sm:text-base">
        <p className="text-gray-400"><strong>Original Name:</strong> {name_original}</p>
        <p className="text-gray-400"><strong>Description:</strong> {description}</p>
        <p className="text-gray-400"><strong>Released:</strong> {released} {tba && '(To be announced)'}</p>
        <p className="text-gray-400"><strong>Last Updated:</strong> {new Date(updated).toLocaleString()}</p>
        <p className="text-gray-400"><strong>Rating:</strong> {rating} / {rating_top}</p>
        <p className="text-gray-400"><strong>Metacritic:</strong> {metacritic}</p>
        {metacritic_platforms.length > 0 && (
          <div className="text-gray-400">
            <strong>Metacritic Platforms:</strong>
            <ul className="list-disc list-inside ml-4">
              {metacritic_platforms.map((platform, index) => (
                <li key={index}>
                  <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-red-500">
                    Metascore: {platform.metascore}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-gray-400"><strong>Playtime:</strong> {playtime} hours</p>
        {esrb_rating && (
          <p className="text-gray-400"><strong>ESRB Rating:</strong> {esrb_rating.name}</p>
        )}
        <p className="text-gray-400"><strong>Ratings Count:</strong> {ratings_count}</p>
        <p className="text-gray-400"><strong>Reviews Count:</strong> {reviews_text_count}</p>
        <p className="text-gray-400"><strong>Added by Users:</strong> {added}</p>
        <p className="text-gray-400"><strong>Suggestions Count:</strong> {suggestions_count}</p>
        <p className="text-gray-400"><strong>Alternative Names:</strong> {alternative_names.join(', ')}</p>
        <div className="text-gray-400">
          <strong>Website:</strong> 
          <button onClick={() => window.open(website, '_blank')} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Play/Download</button>
        </div>
        <div className="text-gray-400">
          <strong>Reddit:</strong> 
          <a href={reddit_url} target="_blank" rel="noopener noreferrer" className="text-red-500 ml-2">{reddit_name}</a>
          <p className="mt-1">{reddit_description}</p>
          <Image src={reddit_logo} alt="Reddit Logo" width={40} height={40} className="mt-2"/>
        </div>
        <p className="text-gray-400"><strong>Reddit Count:</strong> {reddit_count}</p>
        <p className="text-gray-400"><strong>Twitch Count:</strong> {twitch_count}</p>
        <p className="text-gray-400"><strong>Youtube Count:</strong> {youtube_count}</p>
        <p className="text-gray-400"><strong>Screenshots Count:</strong> {screenshots_count}</p>
        <p className="text-gray-400"><strong>Movies Count:</strong> {movies_count}</p>
        <p className="text-gray-400"><strong>Creators Count:</strong> {creators_count}</p>
        <p className="text-gray-400"><strong>Achievements Count:</strong> {achievements_count}</p>
        <p className="text-gray-400"><strong>Parent Achievements Count:</strong> {parent_achievements_count}</p>
        <p className="text-gray-400"><strong>Parents Count:</strong> {parents_count}</p>
        <p className="text-gray-400"><strong>Additions Count:</strong> {additions_count}</p>
        <p className="text-gray-400"><strong>Game Series Count:</strong> {game_series_count}</p>
      </div>
    </main>
    <Footer />
  </div>
);
};

export default GameDetailsPage;


