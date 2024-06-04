// // components/homePage/GameCard.tsx

// "use client";

// import React, { useContext, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { ThemeContext } from "@/app/lib/ThemeContext";
// import { Popover, Tooltip } from "@mui/material";
// import { Game } from "@/app/types/homePage/games"; // Import the Game type

// // Placeholder imports for platform icons
// import {
//   FaWindows,
//   FaPlaystation,
//   FaXbox,
//   FaApple,
//   FaAndroid,
// } from "react-icons/fa";
// import { IoLogoGameControllerA } from "react-icons/io";

// interface GameCardProps {
//   game: Game;
// }

// const GameCard: React.FC<GameCardProps> = ({ game }) => {
//   const { theme } = useContext(ThemeContext);
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   const renderPlatformIcon = (slug: string) => {
//     switch (slug) {
//       case "pc":
//         return <FaWindows className="text-white mx-1" />;
//       case "playstation":
//         return <FaPlaystation className="text-blue-600 mx-1" />;
//       case "xbox":
//         return <FaXbox className="text-green-600 mx-1" />;
//       case "ios":
//         return <FaApple className="text-gray-500 mx-1" />;
//       case "android":
//         return <FaAndroid className="text-green-500 mx-1" />;
//       case "mac":
//         return <FaApple className="text-gray-500 mx-1" />;
//       default:
//         return <IoLogoGameControllerA className="text-gray-500 mx-1" />;
//     }
//   };

//   const getPlatformName = (slug: string) => {
//     switch (slug) {
//       case "pc":
//         return "PC";
//       case "playstation":
//         return "PlayStation";
//       case "xbox":
//         return "Xbox";
//       case "ios":
//         return "iOS";
//       case "android":
//         return "Android";
//       case "mac":
//         return "Mac";
//       default:
//         return "Other";
//     }
//   };

//   return (
//     <div
//       className={`w-full md:w-[30%] lg:w-[19%] h-[320px] rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out ${
//         theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
//       }`}
//             onMouseEnter={handlePopoverOpen}
//             onMouseLeave={handlePopoverClose}
//     >
//       <div className="w-full h-full">
//         <Link
//           key={game.id}
//           href={`/game-details?id=${game.id}&name=${encodeURIComponent(
//             game.name
//           )}`}
//           passHref
//         >
//           <div className="relative w-100 h-[65%]">
//             <Image
//               src={game.background_image || "/images/placeholder.png"}
//               alt={game.name}
//               layout="fill"
//               objectFit="cover"
//               quality={100}
//               className=""
//               loading="lazy"
//             />
//             <div className="absolute bottom-0 left-0 p-2 flex flex-wrap bg-black bg-opacity-50 w-full overflow-hidden">
//               {game.parent_platforms.map(({ platform }) => (
//                 <Tooltip
//                   key={platform.id}
//                   title={getPlatformName(platform.slug)}
//                 >
//                   <div className="mr-2">
//                     {renderPlatformIcon(platform.slug)}
//                   </div>
//                 </Tooltip>
//               ))}
//             </div>
//           </div>
//         </Link>

//         <div className="px-4 py-2 relative h-[35%] overflow-hidden text-wrap">
//           <small className="text-[13px] font-semibold">{game.name}</small>
//           <div className="flex justify-between">
//             <div>
//             {game.genres.map((genre, index) => (
//               <small
//                 key={index}
//                 className={`text-[12px] ${theme === "dark" ? "text-yellow-500" : ""}`}
//               >
//                 {genre.name}
//               </small>
//             ))}
//             </div>
//             {/* <div className="flex my-auto">
//             {game.tags.length > 0 && (
//               <small
//                 className={`text-[8px] ${theme === "dark" ? "text-yellow-500" : ""}`}
//               >
//                 {game.tags[0].name}/{game.tags[1].name}
//               </small>
//             )}
//           </div> */}
//           </div>
//           <Carousel
//             autoPlay
//             interval={3000}
//             infiniteLoop
//             showThumbs={false}
//             showIndicators={false}
//             showStatus={false}
//             showArrows={false}
//             className="text-blue-500"
//           >
//             {game.stores.map((store, storeIndex) => (
//               <div
//                 key={storeIndex}
//                 className="flex items-center justify-center h-full pt-2"
//               >
//                 <a
//                   href={`https://${store.store.domain}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[12px] text-red-500"
//                 >
//                   {store.store.name}
//                 </a>
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//       <Popover
//         sx={{
//           pointerEvents: "auto",
//         }}
//         open={open}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         onClose={handlePopoverClose}
//         disableRestoreFocus
//       >
//         <div className="p-4 w-60 max-h-auto overflow-y-auto">
//           <h3 className="font-bold">{game.name}</h3>
//           {game.short_screenshots.map((screenshot) => (
//             <div key={screenshot.id} className="relative w-full h-32 mb-4">
//               <Image
//                 src={screenshot.image || "/images/placeholder.png"}
//                 alt={game.name}
//                 layout="fill"
//                 objectFit="cover"
//                 quality={100}
//                 className=""
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//       </Popover>
//     </div>
//   );
// };

// export default GameCard;




import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { Tooltip } from "@mui/material";
import { Game } from "@/app/types/homePage/games";
import CustomTooltip from "./CustomTooltip"; // Import CustomTooltip

import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
} from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useContext(ThemeContext);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null); // Create a ref for the card

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

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

  const getPlatformName = (slug: string) => {
    switch (slug) {
      case "pc":
        return "PC";
      case "playstation":
        return "PlayStation";
      case "xbox":
        return "Xbox";
      case "ios":
        return "iOS";
      case "android":
        return "Android";
      case "mac":
        return "Mac";
      default:
        return "Other";
    }
  };

  return (
    <div
      ref={cardRef} // Attach the ref to the card
      className={`w-full md:w-[30%] lg:w-[19%] h-[320px] rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
                <Tooltip
                  key={platform.id}
                  title={getPlatformName(platform.slug)}
                >
                  <div className="mr-2">
                    {renderPlatformIcon(platform.slug)}
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </Link>

        <div className="px-4 py-2 relative h-[35%] overflow-hidden text-wrap">
          <small className="text-[13px] font-semibold">{game.name}</small>
          <div className="flex justify-between">
            <div>
              {game.genres.map((genre, index) => (
                <small
                  key={index}
                  className={`text-[12px] ${
                    theme === "dark" ? "text-yellow-500" : ""
                  }`}
                >
                  {genre.name}
                </small>
              ))}
            </div>
          </div>
          <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            showArrows={false}
            className="text-blue-500"
          >
            {game.stores.map((store, storeIndex) => (
              <div
                key={storeIndex}
                className="flex items-center justify-center h-full pt-2"
              >
                <a
                  href={`https://${store.store.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-red-500"
                >
                  {store.store.name}
                </a>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <CustomTooltip
        content={
          <div className="p-4 w-60 max-h-[600px] overflow-y-auto">
            <h3 className="font-bold">{game.name}</h3>
            {game.short_screenshots.map((screenshot) => (
              <div key={screenshot.id} className="relative w-full h-32 mb-4">
                <Image
                  src={screenshot.image || "/images/placeholder.png"}
                  alt={game.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        }
        targetRef={cardRef}
        visible={tooltipVisible}
      />
    </div>
  );
};

export default GameCard;
