// /app/games

"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchGames } from "../redux/gamesSlice";
import SideBarPages from "../components/sidebar/sidebarPages/SideBarPages";
import useFetchGames from "../hooks/useFetchGames";

const GamePage: React.FC = () => {
  const router = useSearchParams();
  const tagQuery = router ? router.get("tags") : null; // Get the query parameter for tags

  const { games, loading, error } = useSelector(
    (state: RootState) => state.games
  );
  const dispatch: AppDispatch = useDispatch();

  useFetchGames();
 

  // Filter games based on the tagQuery
  const filteredGames = tagQuery
    ? games.filter(game =>
        game.tags?.some(tag => tag.name.toLowerCase() === tagQuery.toLowerCase()) ?? false
      )
    : games;

  return (
    <div>
      <SideBarPages games={filteredGames}/>
    </div>
  );
};

export default GamePage;
