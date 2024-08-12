// hooks/useFetchGames.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGames } from "../redux/gamesSlice";
import { AppDispatch } from "../redux/store";

const useFetchGames = () => {
  const dispatch: AppDispatch = useDispatch();

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
};

export default useFetchGames;
