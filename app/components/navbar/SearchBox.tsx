import React from "react";
import { FaSearch } from "react-icons/fa";

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
  return (
    <div className={`${ClassName}`}>
      <input
        type="text"
        placeholder={`${Placeholder}`}
        // size={40}
        className={`${inputClassName}`}
      />
      <button className="border px-3 h-[30px] bg-[#F4F4F4] my-auto rounded-tr-sm rounded-bt-sm">
        <FaSearch size={15} />
      </button>
    </div>
  );
};

export default SearchBox;
