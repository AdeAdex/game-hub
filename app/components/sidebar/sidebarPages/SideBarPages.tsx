"use client";

import React from "react";
import Navbar from "../../navbar/Navbar";
import { useSearch } from "@/app/lib/SearchContext";
import GameExplorer from "../../homePage/GameExplorer";
import Footer from "../../footer/Footer";
import ScrollToTop from "@/app/utils/ScrollToTop";
import SideBarCompo from "./SideBarCompo";
import { Game } from "@/app/types/homePage/games";
import GameCard from "../../homePage/GameCard";
import SideBar from "../SideBar";
import { useSearchParams } from "next/navigation";
import useTags from "@/app/hooks/useTags";
import { browseData } from "../BrowseData";
import CardSkeleton from "../../homePage/CardSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface SideBarPagesProps {
  games: Game[]; // Updated to accept an array of games
}

const SideBarPages: React.FC<SideBarPagesProps> = ({ games }) => {
  const { handleSearch, suggestions } = useSearch();
  const router = useSearchParams();
  const tagQuery = router ? router.get("tags") : null; // Get the query parameter for tags
  const { allTags, popularTags } = useTags(games);
  const { loading } = useSelector((state: RootState) => state.games);

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  console.log("router", pathname);

  // Show <SideBarCompo /> if the route has a tag or is "/featured-games"
  const showSideBarCompo = tagQuery || pathname === "/featured-games";

  return (
    <div>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      <main
        className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative dark:bg-dark-mode bg-light-mode`}
      >
        {showSideBarCompo ? (
          <SideBarCompo />
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
                games && games.length > 0 ? (
                  games.map((game) => <GameCard key={game.id} game={game} />)
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
                games.map((game) => <GameCard key={game.id} game={game} />)
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
