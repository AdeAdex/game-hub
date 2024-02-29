"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInSuccess } from "@/app/redux/authSlice";

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
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const loginDetails = {
      email,
      password,
    };

    try {
      const response = await axios.post("/api/prompt/login", loginDetails);

      if (response.status === 200) {
        console.log(response.data);
        const { token } = response.data;
        const userInfo = response.data._doc;
        
        dispatch(signInSuccess(userInfo));
        localStorage.loginToken = token;
        enqueueSnackbar(response.data?.message, {
          variant: "success",
        });
        router.push("/dashboard");
      } else {
        console.log(response.data);
        enqueueSnackbar("Unexpected error occurred", {
          variant: "error",
        });
      }
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        const errorMessage =
          error.response.data?.message || "Invalid email or password";
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
      } else {
        console.log(error);
        enqueueSnackbar("Error during login", {
          variant: "error",
        });
      }
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
          {submitting ? <div>Connecting</div> : <div>Login</div>}
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
