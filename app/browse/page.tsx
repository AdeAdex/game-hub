"use client"

import React from "react";
import SideBarPages from "../components/sidebar/sidebarPages/SideBarPages";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const BrowsePage = () => {
  const { games, loading, error } = useSelector(
    (state: RootState) => state.games
  );

  return (
    <div>
      <SideBarPages games={games} />
    </div>
  );
};
export default BrowsePage;
