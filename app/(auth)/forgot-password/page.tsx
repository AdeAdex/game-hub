"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Access email value from form
        }),
      });

      const responseData = await response.json();
      // Handle response data as needed
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F4F4] pt-[80px] md:pt-[100px] h-screen">
      <Navbar />
      <div className="relative  w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
        <h3 className="border-b border-gray-300 font-bold text-[#434343] md:text-[20px] ">
          Reset Password
        </h3>
        <div className="pt-[20px] pb-[10px]">
          <small>
            Enter the email address you registered with and we will send you a
            link to reset your password.
          </small>
        </div>
        <form onSubmit={handleSubmit} className="text-[13px] text-[#434343]">
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold text-[#434343]" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              autoComplete="on"
              name="email"
              className={`w-[65%] border border-2 px-3 py-[5px] border-gray-300`}
              placeholder="Required"
            />
          </div>
          <div className="py-[25px] flex gap-4">
            <button
              type="submit"
              className="bg-[#FF2E51] px-3 py-[6px] text-white rounded-sm"
              disabled={submitting}
            >
              {submitting ? <div>Connecting...</div> : <div>Submit</div>}
            </button>
            <div className="flex my-auto text-[12px] md:text-[14px]">
              <span>or </span>
              <Link href="/login" className="ml-[5px] underline">
                Login
              </Link>
            </div>
          </div>
        </form>
        <div>
          <small>
            If you are having trouble accessing your account, please{" "}
            <Link href="/support" className="text-[#FF2E51] underline">
              contact Support
            </Link>
            .
          </small>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
