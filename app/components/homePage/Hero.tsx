"use client";

import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <main className="flex flex-col md:flex-row w-full">
      <div className="flex flex-col justify-center items-center w-full md:w-6/12 bg-red-500">
        <Link href="/user">User</Link>
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <button
          className="bg-blue-500 px-3 py-2 border border-1 border-transparent rounded-sm"
        >
          <Link href="register">Explore</Link>
        </button>
      </div>
    </main>
  );
};

export default Hero;
