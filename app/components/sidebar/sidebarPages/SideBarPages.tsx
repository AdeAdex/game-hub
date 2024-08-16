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
import { generateRatingRanges } from "@/app/utils/ratingUtils";

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
  const ratingQuery = {
    rating_min: searchParams ? searchParams.get("rating_min") : null,
    rating_max: searchParams ? searchParams.get("rating_max") : null,
  };
  
  const { allTags, popularTags } = useTags(games);
  const { loading, games: reduxGames } = useSelector(
    (state: RootState) => state.games
  );

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Extract links from browseData
  const browseLinks = browseData.map((item) => item.link);

  // Determine which games to display
  const displayGames = games && games.length > 0 ? games : reduxGames;

  // Show <SideBarCompo /> if the route has a tag or is "/featured-games"
  const showSideBarCompo =
    tagQuery ||
    platformQuery ||
    pathname === "/featured-games" ||
    browseLinks.includes(pathname);

    console.log("ratingQuery",ratingQuery)

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

  // Extract unique ratings and generate ranges
  const ratings = displayGames
    .map((game) => game.rating!)
    .filter((rating) => rating !== undefined);
  const ratingRanges = generateRatingRanges(ratings);

  console.log("rate", ratingRanges);

  return (
    <div>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      <main
        className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative dark:bg-dark-mode bg-light-mode`}
      >
        {showSideBarCompo ? (
          <SideBarCompo platforms={allPlatforms} ratings={ratingRanges} />
        ) : (
          <SideBar popularTags={popularTags} browse={browseData} />
        )}
        <section
          className={`mt-1 w-full md:w-[83%] md:ml-[16.6%] dark:bg-dark-mode light-mode-section`}
        >
          <div
            className={`py-[30px] px-[30px] dark:bg-dark-mode light-mode-section`}
          >
            {showSideBarCompo && (
            <div className="dark:text-gray-300 text-[#434343] mb-3 mt-[-15px]">
              <h1 className="text-lg md:text-2xl">
                <strong>
                  Top{" "}
                  {ratingQuery.rating_min || ratingQuery.rating_max ? (
                    <span>
                      {ratingRanges.map((label, index) => (
                        <span key={index}>{label.label} </span>
                      ))}
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="border rounded-md py-1 px-2"> Games</span>{" "}
                  {tagQuery ? (
                    <span>for {tagQuery}</span>
                  ) : platformQuery ? (
                    <span>for {platformQuery}</span>
                  ) : (
                    ""
                  )}
                </strong>
                <span className="text-[#858585]">
                  {" "}
                  ({games.length} results)
                </span>
              </h1>
            </div> 
            )}
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
