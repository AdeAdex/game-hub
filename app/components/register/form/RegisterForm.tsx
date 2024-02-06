import React, { FormEvent, useState } from "react";
import { RegisterUser } from "@/app/controllers/user_controller";
import RegisterWith from "./RegisterWith";
import Link from "next/link";
import AboutYou from "./AboutYou";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };
    try {
      RegisterUser(userData);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div className="w-full flex flex-col relative w-full md:w-[50%] pb-[40px]">
      {/* Register with github section */}
      <section>
        <RegisterWith />
      </section>
      {/* form section */}
      <section>
        <form
          onSubmit={handleCreateAccount}
          className="px-[10px] flex flex-col gap-[25px] mt-[30px] text-[13px] text-[#434343]"
        >
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold " htmlFor="userName">
              UserName:
            </label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-2 px-3 py-[5px] border-gray-300"
            />
          </div>
          <div className="text-center">
            <h3 className="text-black font-bold">Your profile page will be</h3>
            <div
              className="py-2 px-3 bg-[#F9F9F9] mt-[5px]"
              style={{ userSelect: "none" }}
            >
              https://game-hub-adex2210.vercel.app/username
            </div>
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold " htmlFor="firstName">
              FirstName:
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-2 px-3 py-[5px] border-gray-300"
            />
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold " htmlFor="lastName">
              LastName:
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-2 px-3 py-[5px] border-gray-300"
            />
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold " htmlFor="email">
              Your email here:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-2 px-3 py-[5px] border-gray-300"
            />
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold " htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-2 px-3 py-[5px] border-gray-300"
            />
          </div>
          {/* About you section of the form */}
          <section>
            <AboutYou />
          </section>
          {/* form button */}
          <div className="flex flex-col md:flex-row w-full gap-[10px]">
            <button
              type="submit"
              className="text-center py-2 px-4 text-white bg-[#FF2449] rounded-sm"
            >
              Create account
            </button>
            <div className="my-auto">
              <span>or already have an account?</span>
              <Link href="/login" className="underline ml-[5px]">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterForm;
