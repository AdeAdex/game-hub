"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";
import errorImage from "@/public/images/error.webp";

const Error = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={
            errorImage || "https://source.unsplash.com/1600x900/?nature,water"
          }
          alt="ErrorBackgroundImage"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 max-w-md p-8 bg-white rounded-lg shadow-2xl text-center backdrop-filter backdrop-blur-lg bg-opacity-60">
        <div className="text-red-600 text-6xl mb-4 animate-bounce">
          <FaExclamationCircle />
        </div>
        <h2 className="text-4xl font-bold text-red-600 mb-4">Oops!</h2>
        <p className="text-gray-800 mb-6">It seems something went wrong.</p>
        <p className="text-gray-800 mb-6">
          Don't worry, our team has been notified and we're working on fixing
          it. In the meantime, you can try refreshing the page or go back to the
          home page.
        </p>
        <button
          onClick={goBackHome}
          className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Go Back to Home
        </button>
      </div>
      <div className="mt-8 text-white text-sm relative z-20">
        If the problem persists, please contact{" "}
        <a href="/support" target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline">
          support
        </a>
        .
      </div>
    </div>
  );
};

export default Error;
