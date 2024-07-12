"use client";

import Form from "@/app/components/login/Form";
import SocialMediaLogin from "@/app/components/login/SocialMediaLogin";
import Link from "next/link";
import React, { useContext } from "react";

const LoginPage = () => {
  return (
    <div
      className={`w-full lg:w-1/3 mx-auto mt-[1px] md:my-6 rounded-sm dark:bg-gray-700 dark:text-white bg-white text-[#434343]`}
    >
      <h3
        className={`py-[30px] border-b px-[10px] md:px-[30px] font-bold md:text-[20px] dark:border-gray-600 border-gray-300`}
      >
        Log in to your game hub account
      </h3>
      <div className="mt-[35px] px-[10px] md:px-[30px] text-[14px]">
        <Form />
        <SocialMediaLogin />
      </div>
      <hr className={`dark:border-gray-600 border-gray-300`} />
      <div className="text-[14px] py-[15px] px-[10px] md:px-[30px]">
        <Link href="" className="underline">
          Looking for something you bought?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
