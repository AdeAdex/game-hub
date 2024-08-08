"use client";

import React, { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import CardSkeleton from "@/app/components/homePage/CardSkeleton";
import GameCard from "./components/homePage/GameCard";
import { Game } from "@/app/types/homePage/games"; // Import the Game type
import ScrollToTop from "@/app/utils/ScrollToTop"
import { RootState, AppDispatch  } from "./redux/store";
import { fetchGames } from "./redux/gamesSlice";
import { useDispatch, useSelector } from "react-redux";

// Importing links and links2
import { links, links2 } from "./lib/SideBarLinks";
import { useSearch } from "./lib/SearchContext";

export default function Home() {
  const { handleSearch, suggestions } = useSearch();
  const dispatch: AppDispatch = useDispatch();
  const { games, loading, error } = useSelector((state: RootState) => state.games);


  useEffect(() => {
    // Try to fetch from local storage if already fetched
    const cachedGames = localStorage.getItem("games");
    if (!cachedGames) {
      dispatch(fetchGames());
    } else {
      // Set cached games if available
      dispatch({ type: 'games/setGames', payload: JSON.parse(cachedGames) });
    }
  }, [dispatch]);

  return (
    <>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      <main
        className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative dark:bg-dark-mode bg-light-mode`}
      >
        {/* Pass links and links2 to SideBar */}
        <SideBar links={links} links2={links2} />
        <section
          className={`mt-1 w-full md:w-[83%] md:ml-[16.6%] dark:bg-dark-mode light-mode-section`}
        >
          <div
            className={`flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 py-[30px] px-[30px] dark:bg-dark-mode light-mode-section`}
          >
            {loading
              ? // Render card skeleton if loading
                Array.from({ length: 10 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : // Render games if not loading
                games.map((game, index) => (
                  <GameCard key={game.id} game={game} />
                ))}
            <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
              <span
                className={`my-auto dark:text-white text-gray-800`}
              >
                Don&apos;t see anything you like?{" "}
              </span>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span> View all games</span>{" "}
                <IoArrowForward className="my-auto" />
              </Link>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span>View something random</span>{" "}
                <FaRandom className="my-auto" />
              </Link>
            </div>
          </div>
          <Footer />
        </section>
        <ScrollToTop />
      </main>
    </>
  );
}
