// pages/featured-games.tsx
"use client";

import React, { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { fetchGames } from "../redux/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBarPages from "../components/sidebar/sidebarPages/SideBarPages";

const FeaturedGamesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { featuredGames, loading, error } = useSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    // Fetch featured games when component mounts
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <>
    <SideBarPages games={featuredGames}/>
    </>
  );
};

export default FeaturedGamesPage;
