// /app/[username]/library/page.tsx

"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { UserDataType } from "@/app/types/user";
import SkeletonLoader from "@/app/components/userPage/library/SkeletonLoader"; // Import SkeletonLoader
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface LibraryPageProps {
  params: {
    username: string;
  };
}

const LibraryPage: React.FC<LibraryPageProps> = ({ params }) => {
  const { username } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useContext(ThemeContext); // Use ThemeContext to get the current theme
  const [loading, setLoading] = useState<boolean>(true);
  const [userLibrary, setUserLibrary] = useState<any[]>([]); // State to store user library data
  const isFullScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const fetchUserLibrary = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${username}/library`);
        setUserLibrary(response.data);
      } catch (error) {
        console.error("Error fetching user library:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLibrary();
  }, [username]);

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark" ? "dark-mode-content text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div className="mx-auto px-4 lg:px-8 py-8 w-full lg:w-[60%]">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <h2 className={`text-2xl font-bold px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            {username}'s Library
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {loading ? (
              Array.from({ length: 9 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            ) : (
              userLibrary.map((game) => (
                <div key={game.id} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md">
                  <img src={game.background_image} alt={game.name} className="rounded-lg mb-2" />
                  <h3 className="text-lg font-bold mb-1">{game.name}</h3>
                  <p className="text-sm">{game.released}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LibraryPage;
