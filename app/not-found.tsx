import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen">
      <div className="mb-8 w-[100%] md:w-[50%]">
        <div className="w-[100%] h-[200px] md:h-[400px] relative" >
          <Image
            src="/images/not_found.png"
            alt="404 Not Found"
            fill
            loading="lazy"
            quality={90}
            priority={false}
            sizes="(max-width: 1400px) 100vw, 400px"
            placeholder="empty"
          />
        </div>
      </div>
      <div className="w-[100%] md:w-[50%]">
        <h1 className="text-3xl font-semibold mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <span className="text-blue-600 hover:underline">
            Go back to home page
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
