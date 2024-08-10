// /app/game-details/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import Loader from "@/app/components/Loader";
import { GameDetails } from "@/app/types/homePage/game-details";
import GameHeader from "@/app/components/game-details/GameHeader";
import GameDescription from "@/app/components/game-details/GameDescription";
import GameStats from "@/app/components/game-details/GameStats";
import AdditionalInfo from "@/app/components/game-details/AdditionalInfo";
import { useSearch } from "@/app/lib/SearchContext";


const GameDetailsPage: React.FC = () => {
  const router = useSearchParams();
  // console.log("post id", router?.get('id'))
  const gameId = router ? router.get("id") : null;
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { handleSearch, suggestions } = useSearch();


  useEffect(() => {
    if (gameId) {
      const fetchGameDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get<GameDetails>(
            `https://api.rawg.io/api/games/${gameId}`,
            {
              params: {
                key: "4e2c61f658d44adcb51ed39f710a9d71",
              },
            }
          );
          setGameDetails(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("Error fetching game details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchGameDetails();
    }
  }, [gameId]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen dark:bg-gray-900 `}
      >
        <Loader />
      </div>
    );
  }

  if (!gameDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className={`text-xl dark:text-gray-200 text-gray-800 `}>
          No game details found.
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen dark:bg-dark-mode dark:text-white`}>
            <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <main
        className={`w-full max-w-[65.25rem] mx-auto flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8 mt-[60px]`}
      >
        <GameHeader
          name={gameDetails.name}
          backgroundImage={gameDetails.background_image}
        />
        <div
          className={`space-y-6 text-sm sm:text-base dark:bg-gray-800 bg-gray-200  p-6 rounded-lg shadow-lg w-full`}
        >
          <section className="flex flex-col md:flex-row w-full md:gap-x-4 gap-y-6 md:gap-y-0">
            <div className="w-full md:w-[75%] md:border-r-2">
              <GameDescription
                name_original={gameDetails.name_original}
                description_raw={gameDetails.description_raw}
                released={gameDetails.released}
                tba={gameDetails.tba}
                updated={gameDetails.updated}
              />
              <GameStats gameDetails={gameDetails} />
            </div>
            <div className="md:flex flex-col gap-y-4 ">
              <AdditionalInfo
                developers={gameDetails.developers}
                genres={gameDetails.genres}
                publishers={gameDetails.publishers}
                background_image_additional={
                  gameDetails.background_image_additional
                }
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetailsPage;
