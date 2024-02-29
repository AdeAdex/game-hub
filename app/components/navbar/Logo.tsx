import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] relative">
        <Link href="/" className="">
          <Image
            src="/images/ade.png"
            alt="logo"
            fill
            quality={100}
            className=""
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
