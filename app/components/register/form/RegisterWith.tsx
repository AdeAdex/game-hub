"use client";

import React, { useEffect, useState } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterWith = () => {
  const [dropdown, setDropdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleDropdown = () => {
    if (dropdown == false) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  }, [session, router]);

  const handleGithubSignIn = async () => {
    await signIn("github");
  };
  return (
    <>
      <div
        className={`text-[14px] rounded-sm absolute top-0 right-0 z-10 ${
          dropdown ? "border" : ""
        }`}
      >
        <div className={`py-2 px-4 ${dropdown ? "bg-[#F4F4F4]" : ""}`}>
          <button className=" flex gap-[10px]" onClick={handleDropdown}>
            <span>Other registration methods</span>
            {dropdown ? (
              <TfiAngleUp size={12} className="my-auto" />
            ) : (
              <TfiAngleDown size={12} className="my-auto" />
            )}
          </button>
        </div>
        {dropdown && (
          <div className="p-3 bg-white">
            <button
              className="rounded-sm py-1 px-2 border border-red-500 flex gap-3"
              onClick={handleGithubSignIn}
            >
              <FaGithub size={25} />{" "}
              <span className="my-auto font-bold text-red-500">
                Register with GitHub
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterWith;
