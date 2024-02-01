import Link from "next/link";
import React from "react";

interface AuthButtonPros {
  title: string;
  to: string
}

const AuthButton: React.FC<AuthButtonPros> = ({ title, to }) => {
  return (
    <>
      <Link href={to}>
        <button className="text-[14px] capitalize leading-[28px] border border-2 my-auto px-4 py-[-5px]">
          {title}
        </button>
      </Link>
    </>
  );
};

export default AuthButton;
