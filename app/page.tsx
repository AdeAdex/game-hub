/*'use client'
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import CardSkeleton from "@/app/components/homePage/CardSkeleton"; // Import the CardSkeleton component

// Importing links and links2
import { links, links2 } from "./lib/SideBarLinks";

interface Card {
  name: string;
  setName: string;
  imageUrl: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  // const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.magicthegathering.io/v1/cards');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.cards)
        setCards(data.cards);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCards();
  }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     observer.current = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const img = entry.target as HTMLImageElement;
  //           img.src = img.dataset.src || "";
  //           observer.current?.unobserve(img);
  //         }
  //       });
  //     });

  //     document.querySelectorAll('img[data-src]').forEach((img) => {
  //       observer.current?.observe(img);
  //     });
  //   }
  // }, [loading]);

  return (
    <>
      <Navbar />
      <main className="w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative">
        
        <SideBar links={links} links2={links2} />
        <section className="mt-1 w-full md:w-[83%] bg-[#F4F4F4] md:ml-[16.6%]">
          <div className="flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 bg-white py-[30px] px-[30px]">
            {loading ? (
              // Render card skeleton if loading
              Array.from({ length: 10 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : (
              // Render cards if not loading
              cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full md:w-[30%] lg:w-[19%] h-[300px] bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="relative w-100 h-[70%]">
                    <Image
                      src={card.imageUrl || "/images/placeholder.png"} // Check this path
                      alt={card.name}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      className=""
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{card.name}</h2>
                    <p className="text-gray-600">{card.setName}</p>
                  </div>
                </div>
              ))
            )}
            <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
              <span className="my-auto">Don&apos;t see anything you like? </span>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span> View all games</span> <IoArrowForward className="my-auto"/>
              </Link>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span>View something random</span> <FaRandom className="my-auto"/>
              </Link>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  );
}
*/







'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import CardSkeleton from "@/app/components/homePage/CardSkeleton"; // Import the CardSkeleton component

// Importing links and links2
import { links, links2 } from "./lib/SideBarLinks";

interface Game {
  id: number;
  name: string;
  background_image: string;
  stores: { store: { name: string }, url: string }[];
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: '4e2c61f658d44adcb51ed39f710a9d71',
          },
        });
        setGames(response.data.results);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative">
        {/* Pass links and links2 to SideBar */}
        <SideBar links={links} links2={links2} />
        <section className="mt-1 w-full md:w-[83%] bg-[#F4F4F4] md:ml-[16.6%]">
          <div className="flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 bg-white py-[30px] px-[30px]">
            {loading ? (
              // Render card skeleton if loading
              Array.from({ length: 10 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : (
              // Render games if not loading
              games.map((game, index) => (
                <div
                  key={index}
                  className="w-full md:w-[30%] lg:w-[19%] h-[300px] bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="relative w-100 h-[70%]">
                    <Image
                      src={game.background_image || "/images/placeholder.png"}
                      alt={game.name}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      className=""
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{game.name}</h2>
                    {game.stores.map((store, storeIndex) => (
                      <p key={storeIndex}>
                        <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {store.store.name}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
            <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
              <span className="my-auto">Don&apos;t see anything you like? </span>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span> View all games</span> <IoArrowForward className="my-auto"/>
              </Link>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span>View something random</span> <FaRandom className="my-auto"/>
              </Link>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  );
}
