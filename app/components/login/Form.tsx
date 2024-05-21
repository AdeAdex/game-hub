"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { SnackbarProvider, useSnackbar } from "notistack";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import UAParser from "ua-parser-js";
import Bowser from "bowser";
import axios from "axios";



// import { useDispatch } from "react-redux";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import { signInSuccess } from "@/app/redux/authSlice";
// import localforage from "localforage";
// import CryptoJS from 'crypto-js';

// const cookies = new Cookies();

const Form = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [device, setDevice] = useState(""); 
  const [location, setLocation] = useState("");

  // const dispatch = useDispatch();
  // const SECRET_KEY = 'YOUR_SECRET_KEY';

  useEffect(() => {
    // Redirect to dashboard if user session is authenticated
    if (status === "authenticated") {
      router.replace("/dashboard"); // Replace the current URL with /dashboard
    }
  }, [status, router]);

  // const fetchLocation = async () => {
  //   try {
  //     const response = await fetch("https://ipapi.co/json/");
  //     const data = await response.json();
  //     setLocation(`${data.city}, ${data.region}, ${data.country_name}`);
  //   } catch (error) {
  //     console.error("Error fetching location:", error);
  //   }
  // };

  // const detectDevice = () => {
  //   const parser = new UAParser();
  //   const result = parser.getResult();
  //   const deviceInfo = result.device.vendor
  //     ? `${result.device.vendor} ${result.device.model}`
  //     : result.os.name || "Unknown Device";
  //   setDevice(deviceInfo);
  // };


  const getDeviceAndLocation = async () => {
    try {
      // Get device info
      const browser = Bowser.getParser(window.navigator.userAgent);
      const deviceInfo = browser.getResult();
      setDevice(`${deviceInfo.platform.type} - ${deviceInfo.browser.name}`);

      // Get location info
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const locationResponse = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            setLocation(locationResponse.data.display_name);
          },
          (error) => {
            console.error("Error fetching location: ", error);
            setLocation("Location permission denied");
          }
        );
      } else {
        setLocation("Geolocation not supported");
      }
    } catch (err) {
      console.error("Error fetching device and location info: ", err);
    }
  };

  // Function to sign in with credentials and include device and location in request payload
  const signInWithCredentials = async (
    email: string,
    password: string,
    device: string,
    location: string
  ) => {
    try {
      // Sign in with credentials and include device and location in the request payload
      const result = await signIn("credentials", {
        email,
        password,
        device, // Include device information
        location, // Include location information
        redirect: false, // Prevent automatic redirection after sign-in
      });

      if (result && !result.error) {
        // Handle successful sign-in
      } else {
        const errorMessage = result?.error || "Error during login";
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    } catch (error: any) {
      console.error("Error during login:", error.message);
      enqueueSnackbar("Error during login", { variant: "error" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log(device)
      console.log(location)
      // await fetchLocation();
      // detectDevice();
      await getDeviceAndLocation();
      await signInWithCredentials(email, password, device, location);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[25px]">
        <div className="w-full flex flex-col gap-[5px]">
          <label className="w-full " htmlFor="email">
            Username or email:
          </label>
          <input
            className="w-full border border-2 px-3 py-[5px] border-gray-300"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] relative">
          <label className="w-full " htmlFor="password">
            Password:
          </label>
          <input
            className="w-full border border-2 px-3 py-[5px] border-gray-300"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-[10px] top-[50%] bg-[none] border-none cursor-pointer "
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={25} />
            ) : (
              <AiFillEye size={25} />
            )}
          </button>
        </div>
      </div>
      <div className="py-[25px] flex gap-4 border-b border-gray-300">
        <button
          type="submit"
          className="bg-[#FF2E51] px-3 py-[5px] text-white rounded-sm"
          disabled={submitting}
        >
          {submitting ? <div>Connecting...</div> : <div>Login</div>}
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
    </form>
  );
}

export default Form;
