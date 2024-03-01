import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

interface AuthButtonPros {
  title: string;
  to: string
}

const AuthButton: React.FC<AuthButtonPros> = ({ title, to }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(to);
  };
  return (
    <>
      {/* <Link href={to}> */}
        <button className="text-[14px] capitalize leading-[28px] border border-2 my-auto px-4 py-[-5px]" onClick={handleClick}>
          {title}
        </button>
      {/* </Link> */}
    </>
  );
};

export default AuthButton;
