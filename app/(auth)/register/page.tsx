"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import React, { FormEvent, useState } from "react";
import { RegisterUser } from "@/app/controllers/user_controller";

const RegisterPage = () => {
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
    <main>
      <Navbar />
      <button></button>
      <div className="w-full">
        <form onSubmit={handleCreateAccount} className="px-[10px] flex flex-col gap-[25px]">
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full " htmlFor="firstName">
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
            <label className="w-full " htmlFor="lastName">
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
            <label className="w-full " htmlFor="userName">
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
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full " htmlFor="email">
              Email:
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
            <label className="w-full " htmlFor="password">
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
          <button type="submit" className="text-center bg-blue-700 w-full py-2 px-4 text-white mt-[]">Create</button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default RegisterPage;
