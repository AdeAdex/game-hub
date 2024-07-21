import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Game } from "@/app/types/homePage/games"; // Adjust the import path accordingly

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: { game: Game; matchType: string }[];
  handleSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [suggestions, setSuggestions] = useState<{ game: Game; matchType: string }[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        setGames(response.data.results);
      } catch (error: any) {
        console.error("There was a problem with the fetch operation:", error.message);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filteredGames = games.reduce<{ game: Game; matchType: string }[]>((acc, game) => {
      const matchesName = game.name.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = game.genres.some((genre) =>
        genre.name.toLowerCase().includes(query.toLowerCase())
      );
      const matchesParentPlatform = game.parent_platforms.some((platform) =>
        platform.platform.name.toLowerCase().includes(query.toLowerCase())
      );
      const matchesPlatform = game.platforms.some((platform) =>
        platform.platform.name.toLowerCase().includes(query.toLowerCase())
      );
      const matchesStore = game.stores.some((store) =>
        store.store.name.toLowerCase().includes(query.toLowerCase())
      );

      if (matchesName) acc.push({ game, matchType: "name" });
      else if (matchesGenre) acc.push({ game, matchType: "genre" });
      else if (matchesParentPlatform) acc.push({ game, matchType: "parent platform" });
      else if (matchesPlatform) acc.push({ game, matchType: "platform" });
      else if (matchesStore) acc.push({ game, matchType: "store" });

      return acc;
    }, []);

    setSuggestions(filteredGames);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, suggestions, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
