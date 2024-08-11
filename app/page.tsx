"use client";

import React, { useEffect } from "react";
import { RootState, AppDispatch  } from "./redux/store";
import { fetchGames } from "./redux/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBarPages from "./components/sidebar/sidebarPages/SideBarPages";


export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { games } = useSelector((state: RootState) => state.games);

console.log(games)

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
    <SideBarPages games={games}/>
    </>
  );
}
