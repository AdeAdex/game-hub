"use client";

import React, { useContext, useState } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import validationSchema from "@/app/components/validations/settingsValidationSchema";
import { SnackbarProvider, useSnackbar } from "notistack";

const SettingsPage: React.FC = () => {
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
  const { theme } = useContext(ThemeContext);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }

        const response = await axios.post("/api/settings", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          console.log("Settings saved successfully:", response.data);
          enqueueSnackbar(response.data.message, {
            variant: "success",
          });
        } else {
          console.error("Error saving settings:", response.data.error);
          enqueueSnackbar(response.data.error, { variant: "error" });
        }
      } catch (error: any) {
        console.error("Error making request:", error);
        enqueueSnackbar(
          error.response?.data?.message || "Error saving settings",
          { variant: "error" }
        );
      }
    },
  });

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b md:text-[24px] pb-[20px] ${
            theme === "dark"
              ? "border-gray-700 text-white"
              : "border-gray-300 text-[#434343]"
          } font-bold`}
        >
          Settings
        </h3>
        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              autoComplete="on"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              } ${
                formik.errors.firstName && formik.touched.firstName
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : "Enter your first name"
              }
              value={formik.values.firstName}
            />
          </div>

          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              autoComplete="on"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              } ${
                formik.errors.lastName && formik.touched.lastName
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : "Enter your last name"
              }
              value={formik.values.lastName}
            />
          </div>

          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              autoComplete="on"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              } ${
                formik.errors.username && formik.touched.username
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : "Enter your username"
              }
              value={formik.values.username}
            />
          </div>

          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              autoComplete="on"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              } ${
                formik.errors.email && formik.touched.email
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Enter your email"
              }
              value={formik.values.email}
            />
          </div>

          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              autoComplete="on"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border border-2 px-3 py-[5px] ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              } ${
                formik.errors.password && formik.touched.password
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Enter your password"
              }
              value={formik.values.password}
            />
          </div>

          <div className="w-full flex flex-col gap-[5px]">
            <label className="w-full font-bold" htmlFor="profilePicture">
              Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={handleProfilePictureChange}
              className={`w-full border border-2 px-3 py-[5px] ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 font-bold text-white rounded-md ${
              theme === "dark" ? "bg-blue-600" : "bg-blue-500"
            }`}
          >
            Save Settings
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SettingsPage;
