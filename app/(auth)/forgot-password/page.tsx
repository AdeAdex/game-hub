"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext
import ReCAPTCHA from "react-google-recaptcha";
import { verifyRecaptcha } from "@/utils/recaptchaUtils"; 


const ForgotPasswordPage = () => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp />
    </SnackbarProvider>
  );
};

function MyApp() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useContext(ThemeContext); // Use the ThemeContext
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // Initialize recaptchaToken with a type
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  /*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const status = response.status; // Access the status from the response object
      console.log(responseData);

      if (status === 200) {
        router.push('/forgot-password-email-sent')
      } else {
        enqueueSnackbar(responseData.message, { variant: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };*/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true);

    if (!recaptchaToken) {
      enqueueSnackbar("Please complete the reCAPTCHA", { variant: "error" });
      setSubmitting(false);
      return;
    }

    const recaptchaVerified = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaVerified) {
      enqueueSnackbar("Failed reCAPTCHA verification", { variant: "error" });
      setSubmitting(false);
      return;
    }

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
          recaptchaToken // Include the reCAPTCHA token
        }),
      });

      const responseData = await response.json();
      const status = response.status; // Access the status from the response object
      console.log(responseData);

      if (status === 200) {
        router.push('/forgot-password-email-sent')
      } else {
        enqueueSnackbar(responseData.message, { variant: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className={`pt-[80px] md:pt-[100px] h-screen ${theme === "dark" ? "bg-gray-800 text-white" : "bg-[#F4F4F4] text-[#434343]"}`}>
      <Navbar onSearch={(query) => {}} suggestions={[]}/>
      <div className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] mb-[30px] ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
        <h3 className={`border-b font-bold md:text-[20px] ${theme === "dark" ? "border-gray-600 text-white" : "border-gray-300 text-[#434343]"}`}>
          Reset Password
        </h3>
        <div className="pt-[20px] pb-[10px]">
          <small>
            Enter the email address you registered with and we will send you a
            link to reset your password.
          </small>
        </div>
        <form onSubmit={handleSubmit} className="text-[13px]">
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              autoComplete="on"
              name="email"
              className={`w-[100%] md:w-[65%] border border-2 px-3 py-[5px] ${theme === "dark" ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"}`}
              placeholder="Required"
              required
            />
          </div>
          <div className="py-[25px] flex gap-4">
            <button
              type="submit"
              className={`px-3 py-[6px] rounded-sm text-white ${submitting ? "opacity-50 cursor-not-allowed" : ""} ${theme === "dark" ? "bg-red-600" : "bg-[#FF2E51]"}`}
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
          {/* ReCAPTCHA component */}
          {recaptchaSiteKey && (
            <div className="flex item-center justify-center mt-5">
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
              />
            </div>
          )}
        </form>
        <div>
          <small>
            If you are having trouble accessing your account, please{" "}
            <Link href="/support" className={`underline ${theme === "dark" ? "text-red-400" : "text-[#FF2E51]"}`}>
              contact Support
            </Link>
            .
          </small>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
