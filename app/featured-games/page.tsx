// pages/featured-games.tsx
"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import GameCard from "@/app/components/homePage/GameCard";
import CardSkeleton from "../components/homePage/CardSkeleton";
import { useSearch } from "@/app/lib/SearchContext";
import { RootState, AppDispatch } from "../redux/store";
import { fetchGames } from "../redux/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Game } from "../types/homePage/games";


const FeaturedGamesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { featuredGames, loading, error } = useSelector((state: RootState) => state.games);
  const { handleSearch, suggestions } = useSearch();


  useEffect(() => {
    // Fetch featured games when component mounts
    dispatch(fetchGames());
  }, [dispatch]);

  

  return (
    <div
      className={`min-h-screen py-[100px] dark:bg-dark-mode text-white bg-gray-100 text-gray-900 `}
    >
            <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <div
        className={`relative w-full lg:w-[80%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 border-gray-700 bg-white border-gray-300 `}
      >
        <div className="bg-gray-100 dark:bg-dark-mode shadow rounded-lg overflow-hidden">
          <h2
            className={`text-2xl font-bold px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:text-white text-gray-800 `}
          >
            Featured Games
          </h2>
          <div className="flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 py-[30px] px-[30px] ">
            {loading // Display skeleton loader while loading is true
              ? Array.from({ length: 6 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              :  featuredGames.map((game) => (
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
