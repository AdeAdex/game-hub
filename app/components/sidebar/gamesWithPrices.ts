// /app/components/sidebar/gamesWithPrices.ts

import { RootState } from "@/app/redux/store";
import { generateRandomPrices } from "@/app/utils/generatePrices";
import { useSelector } from "react-redux";

const useGamesWithPrices = () => {
  const { games } = useSelector((state: RootState) => state.games);

  // Handle cases where games might be undefined or null
  if (!games || games.length === 0) {
    return { gamesWithPrices: [], prices: [] };
  }

  // Generate random prices
  const prices = generateRandomPrices(games.length);

  // Combine games with prices
  const gamesWithPrices = games.map((game, index) => ({
    ...game,
    price: prices[index]
  }));

  return { gamesWithPrices, prices };
};

export default useGamesWithPrices;
