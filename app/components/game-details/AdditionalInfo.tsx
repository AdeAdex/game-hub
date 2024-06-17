
import React, { useContext } from "react";
import Image from "next/image";
import { Developer, Genre, Publisher } from "@/app/types/homePage/game-details";
import { ThemeContext } from "@/app/lib/ThemeContext";

interface AdditionalInfoProps {
  developers: Developer[];
  genres: Genre[];
  publishers: Publisher[];
  background_image_additional: string;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  developers,
  genres,
  publishers,
  background_image_additional,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col gap-y-6">
      <div className={`flex flex-col p-4 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
        <strong className={`text-xl mb-4 text-center ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
          Screenshot:
        </strong>
        <div className="relative w-full h-44 md:h-80">
          <Image
            src={background_image_additional}
            alt="Screenshots"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={`flex flex-col p-4 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
        <strong className={`text-xl mb-4 text-center ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
          Developers:
        </strong>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {developers.map((developer) => (
            <div key={developer.id} className="relative flex flex-col items-center">
              <div className="rounded-lg w-full md:w-[100%] h-32 md:h-[90px] relative overflow-hidden mb-4 border-2 border-gray-200 shadow-md">
                <Image
                  src={developer.image_background}
                  alt={developer.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              <small className="text-center text-white">{developer.name}</small>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex flex-col p-4 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
        <strong className={`text-xl mb-4 text-center ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
          Publishers:
        </strong>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {publishers.map((publisher) => (
            <div key={publisher.id} className="flex flex-col items-center">
              <div className="rounded-lg w-full md:w-[100%] h-32 md:h-[90px] relative overflow-hidden mb-4 border-2 border-gray-200 shadow-md">
                <Image
                  src={publisher.image_background}
                  alt={publisher.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              <small className="text-center text-white">{publisher.name}</small>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex flex-col p-4 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
        <strong className={`text-xl mb-4 text-center ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
          Genre:
        </strong>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {genres.map((genre) => (
            <div key={genre.id} className="flex flex-col items-center">
              <div className="rounded-lg w-full md:w-[100%] h-32 md:h-[90px] relative overflow-hidden mb-4 border-2 border-gray-200 shadow-md">
                <Image
                  src={genre.image_background}
                  alt={genre.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              <small className="text-center text-white">{genre.name}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
