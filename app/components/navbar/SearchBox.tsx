import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="hidden md:flex">
      <input
        type="text"
        placeholder="Search for games or creator"
        // size={40}
        className="text-[14px] px-3 h-[30px] bg-[#F4F4F4] my-auto"
      />
      <button className="px-3 h-[30px] bg-[#F4F4F4] my-auto rounded-tr-sm rounded-bt-sm">
        <FaSearch size={15} />
      </button>
    </div>
  );
};

export default SearchBox;
