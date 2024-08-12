"use client";

import React from "react";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import SideBarPages from "./components/sidebar/sidebarPages/SideBarPages";
import useFetchGames from "./hooks/useFetchGames";


export default function Home() {
  const { games } = useSelector((state: RootState) => state.games);

  useFetchGames();
 

  return (
    <>
    <SideBarPages games={games}/>
    </>
  );
}
