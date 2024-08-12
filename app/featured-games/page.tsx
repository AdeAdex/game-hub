// pages/featured-games.tsx
"use client";

import React from "react";
import { RootState } from "../redux/store";
import {  useSelector } from "react-redux";
import SideBarPages from "../components/sidebar/sidebarPages/SideBarPages";

const FeaturedGamesPage: React.FC = () => {
  const { featuredGames } = useSelector(
    (state: RootState) => state.games
  );


  return (
    <>
    <SideBarPages games={featuredGames}/>
    </>
  );
};

export default FeaturedGamesPage;
