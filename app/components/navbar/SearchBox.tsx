//  app/components/navbar/SearchBox.tsx


"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Game } from "@/app/types/homePage/games";
import Image from "next/image";
import Link from "next/link";

interface SearchBoxProps {
  ClassName?: string;
  Placeholder?: string;
  inputClassName?: string;
  onSearch: (query: string) => void;
  suggestions: { game: Game; matchType: string }[];
}

const SearchBox: React.FC<SearchBoxProps> = ({
  ClassName,
  Placeholder,
  inputClassName,
  onSearch,
  suggestions,
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  // Group suggestions by matchType
  // const groupedSuggestions = suggestions.reduce((acc, { game, matchType }) => {
  //   if (!acc[matchType]) {
  //     acc[matchType] = [];
  //   }
  //   acc[matchType].push(game);
  //   return acc;
  // }, {} as { [key: string]: Game[] });


   // Group suggestions by matchType
   const groupedSuggestions = suggestions.reduce<{ [key: string]: Game[] }>(
    (acc, { game, matchType }) => {
      if (!acc[matchType]) {
        acc[matchType] = [];
      }
      acc[matchType].push(game);
      return acc;
    },
    {}
  );

  return (
    <div className={`${ClassName}`}>
      <input
        type="text"
        placeholder={`${Placeholder}`}
        className={`${inputClassName}`}
        value={query}
        onChange={handleSearch}
      />
      <button
        className={`dark:bg-gray-600 dark:border-none bg-[#F4F4F4] border px-3 h-[30px]  my-auto rounded-tr-sm rounded-bt-sm `}
      >
        <FaSearch size={15} />
      </button>
      {query && (
        <ul
          className={`absolute top-[45px] md:top-[52px] left-50 w-[90%] md:w-[20%] mt-1 overflow-y-auto max-h-screen pb-[20px] md:pb-[55px] dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white text-black border border-gray-300 rounded-md shadow-lg z-50`}
        >
          <div className="text-[12px] text-center p-2 w-full">
            See results for "{query}"
          </div>
          {suggestions.length > 0 ? (
            <>
              <div
                className={`dark:bg-gray-700 bg-gray-200 text-[12px] px-4 py-1`}
              >
                TAGS
              </div>
              <div className="text-[10px] text-center py-2 px-2 w-full border-b border-gray-600">
                {suggestions.length} match{suggestions.length > 1 ? "es" : ""}{" "}
                found
              </div>
              {Object.entries(groupedSuggestions).map(
                ([matchType, games], index) => (
                  <div key={index}>
                    <div
                      className={`dark:bg-gray-700 bg-gray-200 text-[12px] px-4 py-1`}
                    >
                      ({games.length}) GAMES BY {matchType.toUpperCase()}
                    </div>
                    {games.map((game) => (
                      <Link
                        key={game.id}
                        href={`/game-details?id=${
                          game.id
                        }&name=${encodeURIComponent(game.name)}`}
                        passHref
                      >
                        <li
                          className="px-4 py-2 cursor-pointer hover:bg-blue-200 flex items-center"
                          onClick={() => setQuery(game.name)}
                        >
                          <div className="relative w-8 h-8 mr-2">
                            <Image
                              src={
                                game.background_image || "/default-image.png"
                              }
                              alt={game.name}
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-sm"
                            />
                          </div>
                          <div className="flex flex-col">
                            <small>{game.name}</small>
                            <small>
                              {game.genres.map((genre, index) => (
                                <span
                                  key={index}
                                  className="dark:text-yellow-500"
                                >
                                  {genre.name}
                                </span>
                              ))}
                            </small>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </div>
                )
              )}
            </>
          ) : (
            <li className="px-4 py-2">Game not found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
