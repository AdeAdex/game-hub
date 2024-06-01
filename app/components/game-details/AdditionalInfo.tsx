import React from "react";
import Image from "next/image";
import { Developer, Genre, Publisher } from "@/app/types/homePage/game-details";

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
}) => (
  <div className="flex flex-col gap-y-6">
    <div className="flex flex-col bg-gray-700 p-4 rounded-lg shadow-lg">
      <strong className="text-xl text-gray-200 mb-4 text-center">
        Screenshot:
      </strong>
      <div className="relative w-full h-40 md:h-80">
        <Image
          src={background_image_additional}
          alt="Screenshots"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>

    <div className="flex flex-col bg-gray-700 p-4 rounded-lg shadow-lg">
      <strong className="text-xl text-gray-200 mb-4 text-center">
        Developers:
      </strong>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {developers.map((developer) => (
          <div key={developer.id} className="relative flex flex-col items-center">
            <div className="rounded-lg w-80 md:w-[100%] h-32 md:h-[90px] relative overflow-hidden mb-4 border-2 border-gray-200 shadow-md">
              <Image
                src={developer.image_background}
                alt={developer.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <small className="text-center text-white">{developer.name}</small>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col bg-gray-700 p-4 rounded-lg shadow-lg">
      <strong className="text-xl text-gray-200 mb-4 text-center">
        Publishers:
      </strong>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {publishers.map((publisher) => (
          <div key={publisher.id} className="flex flex-col items-center">
            <div className="rounded-lg w-80 md:w-[100%] h-32 md:h-[90px] relative overflow-hidden mb-4 border-2 border-gray-200 shadow-md">
              <Image
                src={publisher.image_background}
                alt={publisher.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <small className="text-center text-white">{publisher.name}</small>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col bg-gray-700 p-4 rounded-lg shadow-lg">
      <strong className="text-xl text-gray-200 mb-4 text-center">Genre:</strong>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {genres.map((genre) => (
          <div key={genre.id} className="flex flex-col items-center">
            <div className="rounded-lg w-80 md:w-[100%] h-32 md:h-[90px] relative overflow-hidden mb-4 border-2 border-gray-200 shadow-md">
              <Image
                src={genre.image_background}
                alt={genre.name}
                layout="fill"
                objectFit="cover"
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

export default AdditionalInfo;
