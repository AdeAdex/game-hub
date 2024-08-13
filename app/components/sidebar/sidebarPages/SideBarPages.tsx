"use client";

import React from "react";
import Navbar from "../../navbar/Navbar";
import { useSearch } from "@/app/lib/SearchContext";
import GameExplorer from "../../homePage/GameExplorer";
import Footer from "../../footer/Footer";
import ScrollToTop from "@/app/utils/ScrollToTop";
import SideBarCompo from "./SideBarCompo";
import { Game, PlatformDetails } from "@/app/types/homePage/games";
import GameCard from "../../homePage/GameCard";
import SideBar from "../SideBar";
import { useSearchParams } from "next/navigation";
import useTags from "@/app/hooks/useTags";
import { browseData } from "../BrowseData";
import CardSkeleton from "../../homePage/CardSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import useFetchGames from "@/app/hooks/useFetchGames";
import useGamesWithPrices from "../gamesWithPrices";

interface SideBarPagesProps {
  games: Game[]; // Updated to accept an array of games
}

const SideBarPages: React.FC<SideBarPagesProps> = ({ games }) => {
  // Use the custom hook to fetch games either from the server or from storage if no games
  useFetchGames();

  const { handleSearch, suggestions } = useSearch();
  const searchParams = useSearchParams();
  const tagQuery = searchParams ? searchParams.get("tags") : null; // Get the query parameter for tags
  const platformQuery = searchParams ? searchParams.get("platform") : null; // Get the query parameter for platform
  const { allTags, popularTags } = useTags(games);
  const { loading, games: reduxGames } = useSelector(
    (state: RootState) => state.games
  );

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Extract links from browseData
  const browseLinks = browseData.map((item) => item.link);

  // Use the custom hook to get games with prices and prices array
  const { gamesWithPrices, prices } = useGamesWithPrices();


  // Determine which games to display
  // const displayGames = games && games.length > 0 ? games : reduxGames;


  const displayGames = games && games.length > 0 ? gamesWithPrices : reduxGames;

  console.log("games are",displayGames)
  console.log("price",prices)

  // Show <SideBarCompo /> if the route has a tag or is "/featured-games"
  const showSideBarCompo =
    tagQuery || platformQuery ||
    pathname === "/featured-games" ||
    browseLinks.includes(pathname);

  // Extract unique platforms using a Map to retain detailed information
  const platformMap = new Map<string, PlatformDetails>();

  displayGames.forEach((game) => {
    game.platforms.forEach((p) => {
      const platform = p.platform;
      if (!platformMap.has(platform.name)) {
        platformMap.set(platform.name, platform);
      }
    });
  });

  // Convert Map to array
  const allPlatforms: PlatformDetails[] = Array.from(platformMap.values());

  // console.log("allPlatforms", allPlatforms);

  return (
    <div>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      <main
        className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative dark:bg-dark-mode bg-light-mode`}
      >
        {showSideBarCompo ? (
          <SideBarCompo platforms={allPlatforms} prices={prices}/>
        ) : (
          <SideBar popularTags={popularTags} browse={browseData} />
        )}
        <section
          className={`mt-1 w-full md:w-[83%] md:ml-[16.6%] dark:bg-dark-mode light-mode-section`}
        >
          <div
            className={`py-[30px] px-[30px] dark:bg-dark-mode light-mode-section`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {showSideBarCompo ? (
                displayGames && displayGames.length > 0 ? (
                  displayGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))
                ) : (
                  <p>No games found with tag</p>
                )
              ) : loading ? (
                // Render card skeleton if loading
                Array.from({ length: 10 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              ) : (
                // Render games if not loading
                displayGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              )}
            </div>

            <GameExplorer />
          </div>
          <Footer />
        </section>
        <ScrollToTop />
      </main>
    </div>
  );
};

export default SideBarPages;
