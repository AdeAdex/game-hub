import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext


interface SearchBoxProps {
  ClassName?: string;
  Placeholder?: string;
  inputClassName?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  ClassName,
  Placeholder,
  inputClassName,
}: SearchBoxProps) => {
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

  return (
    <div className={`${ClassName}`}>
      <input
        type="text"
        placeholder={`${Placeholder}`}
        // size={40}
        className={`${inputClassName}`}
      />
      <button className={`${theme === "dark" ? 'bg-gray-600 border-none' : 'bg-[#F4F4F4]' } border px-3 h-[30px]  my-auto rounded-tr-sm rounded-bt-sm `}>
        <FaSearch size={15} />
      </button>
    </div>
  );
};

export default SearchBox;
