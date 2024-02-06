"use client";

import React, { useState } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";

const RegisterWith = () => {
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    if (dropdown == false) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };
  return (
    <>
      <div className={`text-[14px] rounded-sm absolute top-0 right-0 z-10 ${dropdown ? 'border' : ''}`}>
        <div className={`py-2 px-4 ${dropdown ? 'bg-[#F4F4F4]' : ''}`}>
          <button
            className=" flex gap-[10px]"
            onClick={handleDropdown}
          >
            <span>Other registration methods</span>
            {dropdown ? (
              <TfiAngleUp size={12} className="my-auto" />
            ) : (
              <TfiAngleDown size={12} className="my-auto" />
            )}
          </button>
        </div>
        {dropdown && (
          <div className="p-3 bg-white">
            <button className="rounded-sm py-1 px-2 border border-red-500 flex gap-3">
             <FaGithub size={25}/> <span className="my-auto font-bold text-red-500">Register with GitHub</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterWith;
