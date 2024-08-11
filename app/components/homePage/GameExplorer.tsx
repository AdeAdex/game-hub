import React from "react";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";

const GameExplorer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
      <span className={`my-auto dark:text-white text-gray-800`}>
        Don&apos;t see anything you like?{" "}
      </span>
      <Link
        href="/games"
        className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
      >
        <span> View all games</span> <IoArrowForward className="my-auto" />
      </Link>
      <Link
        href=""
        className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
      >
        <span>View something random</span> <FaRandom className="my-auto" />
      </Link>
    </div>
  );
};

export default GameExplorer;
