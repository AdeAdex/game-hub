import React from "react";
import Link from "next/link";

const Form = () => {
  return (
    <>
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
        <button
          type="submit"
          className="bg-[#FF2E51] px-3 py-[5px] text-white rounded-sm"
        >
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
    </>
  );
};

export default Form;
