"use client";

import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext
import { Game } from "@/app/types/homePage/games";
import Image from "next/image";
import Link from "next/link";

interface SearchBoxProps {
  ClassName?: string;
  Placeholder?: string;
  inputClassName?: string;
  onSearch: (query: string) => void;
  suggestions: Game[];
}

const SearchBox: React.FC<SearchBoxProps> = ({
  ClassName,
  Placeholder,
  inputClassName,
  onSearch,
  suggestions,
}: SearchBoxProps) => {
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

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
        className={`${
          theme === "dark" ? "bg-gray-600 border-none" : "bg-[#F4F4F4]"
        } border px-3 h-[30px]  my-auto rounded-tr-sm rounded-bt-sm `}
      >
        <FaSearch size={15} />
      </button>
      {query && (
        <ul
          className={`absolute top-[55px] left-50 w-[90%] md:w-[20%] mt-1 overflow-y-auto max-h-screen ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          } border ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          } rounded-md shadow-lg z-50`}
        >
          <div className="text-[12px] text-center p-2 w-full">
            See results for "{query}"
          </div>
          {suggestions.length > 0 ? (
            <>
              <div
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } text-[12px] px-4 py-1`}
              >
                TAGS
              </div>
              <div className="text-[10px] text-center py-2 px-2 w-full border-b border-gray-600">
                {suggestions.length} match{suggestions.length > 1 ? "es" : ""}{" "}
                found
              </div>
              <div
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } text-[12px] px-4 py-1`}
              >
                GAMES
              </div>
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.id}
                  href={`/game-details?id=${
                    suggestion.id
                  }&name=${encodeURIComponent(suggestion.name)}`}
                  passHref
                >
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-blue-200 flex items-center"
                    onClick={() => setQuery(suggestion.name)}
                  >
                    <div className="relative w-8 h-8 mr-2">
                      <Image
                        src={
                          suggestion.background_image || "/default-image.png"
                        }
                        alt={suggestion.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <small>{suggestion.name}</small>
                      <small>
                        {suggestion.genres.map((genre, index) => (
                          <span
                            key={index}
                            className={
                              theme === "dark" ? "text-yellow-500" : ""
                            }
                          >
                            {genre.name}
                          </span>
                        ))}
                      </small>
                    </div>
                  </li>
                </Link>
              ))}
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
