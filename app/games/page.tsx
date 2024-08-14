// /app/games

"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SideBarPages from "../components/sidebar/sidebarPages/SideBarPages";
import useFetchGames from "../hooks/useFetchGames";

const GamePage: React.FC = () => {
  const searchParams = useSearchParams();
  const tagQuery = searchParams ? searchParams.get("tags") : null; // Get the query parameter for tags
  const platformQuery = searchParams ? searchParams.get("platform") : null; // Get the query parameter for platform
  const ratingMinQuery = searchParams ? searchParams.get("rating_min") : null;
  const ratingMaxQuery = searchParams ? searchParams.get("rating_max") : null;

  const { games } = useSelector((state: RootState) => state.games);

  useFetchGames();

  // Convert query parameters to numbers
  const ratingMin = ratingMinQuery ? parseFloat(ratingMinQuery) : undefined;
  const ratingMax = ratingMaxQuery ? parseFloat(ratingMaxQuery) : undefined;

  // Filter games based on the tagQuery or platformQuery
  // Filter games based on the tagQuery, platformQuery, and rating range
  const filteredGames = games.filter((game) => {
    // Filter based on tags
    const matchesTag = tagQuery
      ? game.tags?.some(
          (tag) => tag.name.toLowerCase() === tagQuery.toLowerCase()
        )
      : true;

    // Filter based on platform
    const matchesPlatform = platformQuery
      ? game.platforms?.some(
          (platform) =>
            platform.platform.name.toLowerCase() === platformQuery.toLowerCase()
        )
      : true;

    // Filter based on rating range
    const matchesRating =
      ratingMin !== undefined && ratingMax !== undefined
        ? game.rating !== undefined &&
          game.rating >= ratingMin &&
          game.rating <= ratingMax
        : true;

    return matchesTag && matchesPlatform && matchesRating;
  });

  return (
    <div>
      <SideBarPages games={filteredGames} />
    </div>
  );
};

export default GamePage;
