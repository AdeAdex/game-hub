"use client";

import React, { useEffect } from "react";
import { RootState, AppDispatch  } from "./redux/store";
import { fetchGames } from "./redux/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBarPages from "./components/sidebar/sidebarPages/SideBarPages";
import useFetchGames from "./hooks/useFetchGames";


export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { games } = useSelector((state: RootState) => state.games);

  useFetchGames();
 

  return (
    <>
    <SideBarPages games={games}/>
    </>
  );
}
