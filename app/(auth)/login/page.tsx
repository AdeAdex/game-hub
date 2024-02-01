import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  return (
    <main className="w-full bg-[#F4F4F4] md:h-screen">
      <Navbar/>
      <div className=" w-full lg:w-1/3 mx-auto mt-[1px] md:mt-6 bg-white rounded-sm">
        <h3 className="py-[30px] border-b border-gray-300 px-[10px] md:px-[30px] font-bold text-[#434343] md:text-[20px] ">
          Log in to your game hub account
        </h3>
        <div className="mt-[35px] px-[10px] md:px-[30px] text-[14px] text-[#434343]">
          <div className="flex flex-col gap-[25px]">
            <div className="w-full flex flex-col gap-[5px]">
              <label className="w-full " htmlFor="username">
                Username or email:
              </label>
              <input
                className="w-full border border-2 px-3 py-[5px] border-gray-300"
                type="text"
                id="username"
                name="username"
                placeholder="Required"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px]">
              <label className="w-full " htmlFor="password">
                Password:
              </label>
              <input
                className="w-full border border-2 px-3 py-[5px] border-gray-300"
                type="password"
                id="password"
                name="password"
                placeholder="Required"
              />
            </div>
          </div>
          <div className="py-[25px] flex gap-4 border-b border-gray-300">
            <button className="bg-[#FF2E51] px-3 py-[5px] text-white rounded-sm">
              Login
            </button>
            <div className="flex my-auto text-[12px] md:text-[14px]">
              <span>or </span>
              <Link href="/register" className="ml-[5px] underline">
                Create account
              </Link>
              <Link href="/forgot-password" className="ml-[10px] underline">
                Forgot password
              </Link>
            </div>
          </div>
          <div className="py-[25px]">
            <div className="text-[12px] font-bold">Or log in with another site</div>
            <button className="flex gap-3 mt-[10px] border border-[#FF2E51] py-[5px] px-4 rounded-sm">
              <FaGithub size={25} />
              <span className="text-[#FF2E51]">Log in with GitHub</span>
            </button>
          </div>
        </div>
        <hr />
        <div className="text-[14px] py-[15px] px-[10px] md:px-[30px]">
          <Link href="" className="underline">
            Looking for something you bought?
          </Link>
        </div>
      </div>
      <Footer/>
    </main>
  );
};

export default LoginPage;
