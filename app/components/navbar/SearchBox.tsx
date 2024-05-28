'use client'

import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext


interface SearchBoxProps {
  ClassName?: string;
  Placeholder?: string;
  inputClassName?: string;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  ClassName,
  Placeholder,
  inputClassName,
  onSearch,
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
      <button className={`${theme === "dark" ? 'bg-gray-600 border-none' : 'bg-[#F4F4F4]' } border px-3 h-[30px]  my-auto rounded-tr-sm rounded-bt-sm `}>
        <FaSearch size={15} />
      </button>
    </div>
  );
};

export default SearchBox;
