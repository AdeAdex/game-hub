import React, { useContext } from "react";
import { GameDetails } from "@/app/types/homePage/game-details";
import { ThemeContext } from "@/app/lib/ThemeContext";

interface GameStatsProps {
  gameDetails: GameDetails;
}

const GameStats: React.FC<GameStatsProps> = ({ gameDetails }) => {
  const { theme } = useContext(ThemeContext);

  const {
    rating,
    rating_top,
    metacritic,
    playtime,
    esrb_rating,
    ratings_count,
    reviews_text_count,
    added,
    suggestions_count,
    alternative_names,
    reddit_count,
    twitch_count,
    youtube_count,
    screenshots_count,
    movies_count,
    creators_count,
    achievements_count,
    parent_achievements_count,
    parents_count,
    additions_count,
    game_series_count,
    metacritic_platforms,
    website,
  } = gameDetails;

  return (
    <section className="flex flex-col gap-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Rating:</strong> {rating} / {rating_top}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Metacritic:</strong> {metacritic}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Playtime:</strong> {playtime} hours
        </p>
        {esrb_rating && (
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <strong>ESRB Rating:</strong> {esrb_rating.name}
          </p>
        )}
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Ratings Count:</strong> {ratings_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Reviews Count:</strong> {reviews_text_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Added by Users:</strong> {added}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Suggestions Count:</strong> {suggestions_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Alternative Names:</strong> {alternative_names.join(", ")}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Reddit Count:</strong> {reddit_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Twitch Count:</strong> {twitch_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Youtube Count:</strong> {youtube_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Screenshots Count:</strong> {screenshots_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Movies Count:</strong> {movies_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Creators Count:</strong> {creators_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Achievements Count:</strong> {achievements_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Parent Achievements Count:</strong> {parent_achievements_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Parents Count:</strong> {parents_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Additions Count:</strong> {additions_count}
        </p>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <strong>Game Series Count:</strong> {game_series_count}
        </p>
      </div>
      <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        <strong>Metacritic Platforms:</strong>
        <ul className="list-disc list-inside ml-4">
          {metacritic_platforms.map((platform, index) => (
            <li key={index}>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                Metascore: {platform.metascore}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center`}>
        <strong>Website:</strong>
        <button
          onClick={() => window.open(website, "_blank")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Play/Download
        </button>
      </div>
    </section>
  );
};

export default GameStats;
