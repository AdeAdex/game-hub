// /app/games



"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Navbar from "../components/navbar/Navbar";
import { useSearch } from "../lib/SearchContext";
import useTags from "../hooks/useTags";
import SideBar from "../components/sidebar/SideBar";
import GameCard from "../components/homePage/GameCard";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../utils/ScrollToTop";

const GamePage: React.FC = () => {
  const router = useSearchParams();
  const tagQuery = router ? router.get("tags") : null; // Get the query parameter for tags

  const { games, loading, error } = useSelector(
    (state: RootState) => state.games
  );
  const { handleSearch, suggestions } = useSearch();
  const { allTags, popularTags } = useTags(games);

  useEffect(() => {
    // Fetch featured games when component mounts
    // dispatch(fetchGames());
  }, []);

  // Filter games based on the tagQuery
  const filteredGames = tagQuery
    ? games.filter(game =>
        game.tags?.some(tag => tag.name.toLowerCase() === tagQuery.toLowerCase()) ?? false
      )
    : games;

  return (
    <div>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      <main
        className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative dark:bg-dark-mode bg-light-mode`}
      >
        <SideBar popularTags={popularTags} allTags={allTags} />
        <section
          className={`mt-1 w-full md:w-[83%] md:ml-[16.6%] dark:bg-dark-mode light-mode-section`}
        >
          <div
            className={`flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 py-[30px] px-[30px] dark:bg-dark-mode light-mode-section`}
          >
            {filteredGames && filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <p>No games found with tag "{tagQuery}"</p>
            )}
            <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
              <span className={`my-auto dark:text-white text-gray-800`}>
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
    </div>
  );
};

export default GamePage;
