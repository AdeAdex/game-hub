// pages/featured-games.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import GameCard from "@/app/components/homePage/GameCard";
import { ThemeContext } from "@/app/lib/ThemeContext";
import SkeletonLoader from "@/app/components/featured-games/SkeletonLoader"; // Import SkeletonLoader component

const FeaturedGamesPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [featuredGames, setFeaturedGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchFeaturedGames = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const response = await axios.get("/api/games");
        // Example: Filter games based on certain criteria (e.g., ratings, release date)
        const filteredGames = response.data.results.filter((game: any) => {
          // Replace with your own logic to determine featured games
          return game.rating > 4.5; // Example filter condition: games with rating higher than 4.5
        });
        setFeaturedGames(filteredGames.slice(0, 9)); // Adjust to show a limited number of featured games
      } catch (error) {
        console.error("Error fetching featured games:", error);
      } finally {
        setLoading(false); // Set loading state to false after data fetching is completed
      }
    };

    fetchFeaturedGames();
  }, []);

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark"
          ? "dark-mode-content text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div className={`relative w-full lg:w-[80%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}>
        <div className="bg-white dark-mode-content shadow rounded-lg overflow-hidden">
          <h2
            className={`text-2xl font-bold px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Featured Games
          </h2>
          <div className="flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 py-[30px] px-[30px] ">
            {loading // Display skeleton loader while loading is true
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonLoader key={index} /> // Render SkeletonLoader component
                ))
              : featuredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedGamesPage;
