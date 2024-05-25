'use client'

import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { Popover } from "@mui/material";
// Placeholder imports for platform icons
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";

interface Store {
  url: string;
  store: {
    name: string;
    domain: string;
  };
}

interface Platform {
        id: number;
        name: string;
        slug: string;
      }

interface Game {
  id: number;
  name: string;
  background_image: string;
  stores: Store[];
  parent_platforms: { platform: Platform }[];
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderPlatformIcon = (slug: string) => {
        switch (slug) {
          case "pc":
            return <FaWindows className="text-white mx-1" />;
          case "playstation":
            return <FaPlaystation className="text-blue-600 mx-1" />;
          case "xbox":
            return <FaXbox className="text-green-600 mx-1" />;
          case "ios":
            return <FaApple className="text-gray-500 mx-1" />;
          case "android":
            return <FaAndroid className="text-green-500 mx-1" />;
          case "mac":
            return <FaApple className="text-gray-500 mx-1" />;
          default:
            return <IoLogoGameControllerA className="text-gray-500 mx-1" />;
        }
      };

  return (
    <div
      className={`w-full md:w-[30%] lg:w-[19%] h-[320px] rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <div className="w-full h-full">
        <Link
          key={game.id}
          href={`/game-details?id=${game.id}&name=${encodeURIComponent(
            game.name
          )}`}
          passHref
        >
          <div className="relative w-100 h-[65%]">
            <Image
              src={game.background_image || "/images/placeholder.png"}
              alt={game.name}
              layout="fill"
              objectFit="cover"
              quality={100}
              className=""
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 p-2 flex flex-wrap bg-black bg-opacity-50 w-full overflow-hidden">
              {game.parent_platforms.map(({ platform }) => (
                <div key={platform.id} className="mr-2">
                  {renderPlatformIcon(platform.slug)}
                </div>
              ))}
            </div>
          </div>
        </Link>

        <div className="p-4 relative h-[35%] overflow-y-auto custom-scrollbar whitespace-nowrap">
          <small className="text-[14px] font-semibold">{game.name}</small>
          <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            showArrows={false}
            className="text-blue-500 underline"
          >
            {game.stores.map((store, storeIndex) => (
              <div
                key={storeIndex}
                className="flex items-center justify-center h-full"
              >
                <a
                  href={`https://${store.store.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {store.store.name}
                </a>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="p-4">
          <h3 className="font-bold">{game.name}</h3>
          <p>More information about the game...</p>
          {/* Add any additional information you want to display in the popover here */}
        </div>
      </Popover>
    </div>
  );
};

export default GameCard;
