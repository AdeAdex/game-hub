"use client";

import React, { useState } from "react";
import RegisterWith from "./RegisterWith";
import Link from "next/link";
import AboutYou from "./AboutYou";
import { useRouter } from "next/navigation";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyRecaptcha } from "@/app/utils/recaptchaUtils";

const RegisterForm = () => {
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
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // Initialize recaptchaToken with a type
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
    },

    onSubmit: async (values) => {
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

      try {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: values,
          }),
        });

        const responseData = await response.json();

        if (responseData.status === 201) {
          console.log("created", responseData);

          enqueueSnackbar(responseData.message, {
            variant: "success",
          });
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          console.log("Error creating user:", responseData.message);
          enqueueSnackbar(responseData.message || "Error creating user", {
            variant: "error",
          });
        }
      } catch (error: any) {
        console.error(error.message);
        enqueueSnackbar("Error creating user", {
          variant: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },

    validationSchema: yup.object({
      userName: yup.string().required("Username is required"),
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
          "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one special character, and one digit"
        )
        .required("Password is required"),
    }),
  });

  const handleRecaptchaChange = (token: string | null) => {
    // Called when reCAPTCHA token changes
    setRecaptchaToken(token);
  };

  return (
    <div
      className={`w-full flex flex-col relative w-full md:w-[50%] pb-[40px] dark:bg-gray-800 dark:text-white bg-white text-black`}
    >
      {/* Register with github section */}
      <section>
        <RegisterWith />
      </section>
      {/* form section */}
      <section>
        <form
          onSubmit={formik.handleSubmit}
          className="px-[10px] flex flex-col gap-[25px] mt-[30px] text-[13px]"
        >
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="userName">
              UserName:
            </label>
            <input
              type="text"
              autoComplete="on"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] dark:border-gray-600 dark:bg-gray-700 border-gray-300 ${
                formik.errors.userName && formik.touched.userName
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.userName && formik.errors.userName
                  ? formik.errors.userName
                  : "Enter your username"
              }
            />
          </div>
          <div className="text-center">
            <h3 className="font-bold">Your profile page will be</h3>
            <div
              className={`py-2 px-3 mt-[5px] dark:bg-gray-700 bg-[#F9F9F9]`}
              style={{ userSelect: "none" }}
            >
              https://adex-game-hub.vercel.app/
              {formik.values.userName ? formik.values.userName : "username"}
            </div>
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="firstName">
              FirstName:
            </label>
            <input
              type="text"
              autoComplete="on"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] dark:border-gray-600 dark:bg-gray-700 border-gray-300 ${
                formik.errors.firstName && formik.touched.firstName
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : "Enter your firstname"
              }
            />
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="lastName">
              LastName:
            </label>
            <input
              type="text"
              autoComplete="on"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] dark:border-gray-600 dark:bg-gray-700 border-gray-300 ${
                formik.errors.lastName && formik.touched.lastName
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : "Enter your lastname"
              }
            />
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="email">
              Your email here:
            </label>
            <input
              type="email"
              autoComplete="on"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] dark:border-gray-600 dark:bg-gray-700 border-gray-300 ${
                formik.errors.email && formik.touched.email
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Enter your email"
              }
            />
          </div>
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] dark:border-gray-600 dark:bg-gray-700 border-gray-300 ${
                formik.errors.password && formik.touched.password
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Enter your password"
              }
            />
            {formik.touched.password &&
              formik.errors.password &&
              !formik.errors.password.match(/required/i) && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
          </div>
          {/* About you section of the form */}
          <section>
            <AboutYou />
          </section>
          <div>
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleRecaptchaChange}
            />
          </div>
          {/* form button */}
          <div className="flex flex-col md:flex-row w-full gap-[10px]">
            <button
              type="submit"
              className={`text-center py-2 px-4 text-white rounded-sm  ${
                submitting ? "bg-gray-400" : "dark:bg-gray-700 bg-[#FF2449]"
              }`}
              disabled={submitting}
            >
              {submitting ? (
                <span>Processing...</span>
              ) : (
                <span>Create account</span>
              )}
            </button>
            <div className="my-auto">
              <span>or already have an account?</span>
              <Link
                href="/login"
                className={`underline ml-[5px] dark:text-red-300 text-red-600 `}
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default RegisterForm;
