"use client";

import React, { FormEvent, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { SnackbarProvider, useSnackbar } from "notistack";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { useFetchLocation, useDetectDevice } from "@/app/utils/useDeviceUtils";
import { signInSuccess } from "@/app/redux/authSlice";
import { useDispatch } from 'react-redux';
import useAuth from "@/app/hooks/useAuth";

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
  const { data: session } = useSession();
  const { location, locationError, fetchLocation } = useFetchLocation();
  const device = useDetectDevice();
  const dispatch = useDispatch();

  useAuth("/dashboard");
 
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const signInWithCredentials = async (
    email: string,
    password: string,
    device: string,
    location: string
  ) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        device,
        location,
        redirect: false,
      });

      console.log("result",result)

      if (result?.ok) {
        const user = session?.user; // Fetch user from session
        if (user) {
          // Dispatch user information to Redux store
          console.log("user", user)
          dispatch(signInSuccess(user));
        }
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
    if (locationError) {
      enqueueSnackbar(locationError, { variant: "warning" });
    }
    await signInWithCredentials(email, password, device, location);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[25px]">
        <div className="w-full flex flex-col gap-[5px]">
          <label className="w-full" htmlFor="email">
            Username or email:
          </label>
          <input
            className={`w-full border border-2 px-3 py-[5px] dark:border-gray-700 dark:bg-gray-800 dark:text-white border-gray-300 bg-white text-black`}
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] relative">
          <label className="w-full" htmlFor="password">
            Password:
          </label>
          <input
            className={`w-full border border-2 px-3 py-[5px] dark:border-gray-700 dark:bg-gray-800 dark:text-white border-gray-300 bg-white text-black`}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-[10px] top-[50%] bg-none border-none cursor-pointer"
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

      <div className="py-[25px] flex gap-4 border-b">
        <button
          type="submit"
          className={`px-3 py-[5px] rounded-sm dark:bg-[#FF2E51] dark:text-white bg-[#FF2E51] text-white`}
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
