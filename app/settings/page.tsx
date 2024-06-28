
"use client";

import React, { useContext, useState, useEffect } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { useFormik } from "formik";
import axios from "axios";
import validationSchema from "@/app/components/validations/settingsValidationSchema";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";

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
  const [selectedOption, setSelectedOption] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      const email = searchParams.get("email");
      console.log(email);
      setUserEmail(email);
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      facebook: "",
      linkedin: "",
      twitter: "",
    },
    validationSchema: validationSchema(selectedOption),
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setIsLoading(true);

        const response = await axios.post("/api/settings", {
          ...values,
          profilePicture: newImage,
          userEmail: userEmail,
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
          error.response?.data?.error || "Error saving settings",
          { variant: "error" }
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewImage(reader.result as string);
      };
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "profile":
        return (
          <>
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
              <label className="w-full font-bold" htmlFor="userName">
                User Name:
              </label>
              <input
                type="text"
                autoComplete="on"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border border-2 px-3 py-[5px] ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300"
                } ${
                  formik.errors.userName && formik.touched.userName
                    ? "register-input"
                    : ""
                }`}
                placeholder={
                  formik.touched.userName && formik.errors.userName
                    ? formik.errors.userName
                    : "Enter your user name"
                }
                value={formik.values.userName}
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
          </>
        );
      case "email":
        return (
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
        );
      case "password":
        return (
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
        );
      case "socialMedia":
        return (
          <>
            <div className="w-full flex flex-col gap-[5px]">
              <label className="w-full font-bold" htmlFor="facebook">
                Facebook:
              </label>
              <input
                type="text"
                autoComplete="on"
                name="facebook"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border border-2 px-3 py-[5px] ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300"
                } ${
                  formik.errors.facebook && formik.touched.facebook
                    ? "register-input"
                    : ""
                }`}
                placeholder={
                  formik.touched.facebook && formik.errors.facebook
                    ? formik.errors.facebook
                    : "Enter your Facebook profile link"
                }
                value={formik.values.facebook}
              />
            </div>
            <div className="w-full flex flex-col gap-[5px]">
              <label className="w-full font-bold" htmlFor="linkedin">
                LinkedIn:
              </label>
              <input
                type="text"
                autoComplete="on"
                name="linkedin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border border-2 px-3 py-[5px] ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300"
                } ${
                  formik.errors.linkedin && formik.touched.linkedin
                    ? "register-input"
                    : ""
                }`}
                placeholder={
                  formik.touched.linkedin && formik.errors.linkedin
                    ? formik.errors.linkedin
                    : "Enter your LinkedIn profile link"
                }
                value={formik.values.linkedin}
              />
            </div>
            <div className="w-full flex flex-col gap-[5px]">
              <label className="w-full font-bold" htmlFor="twitter">
                Twitter:
              </label>
              <input
                type="text"
                autoComplete="on"
                name="twitter"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border border-2 px-3 py-[5px] ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300"
                } ${
                  formik.errors.twitter && formik.touched.twitter
                    ? "register-input"
                    : ""
                }`}
                placeholder={
                  formik.touched.twitter && formik.errors.twitter
                    ? formik.errors.twitter
                    : "Enter your Twitter profile link"
                }
                value={formik.values.twitter}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark"
          ? "dark-mode-content text-white"
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
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 w-full p-4">
            <div
              className={`p-2 cursor-pointer rounded-md ${
                selectedOption === "profile"
                  ? theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-200"
                  : ""
              }`}
              onClick={() => setSelectedOption("profile")}
            >
              Profile
            </div>
            <div
              className={`p-2 cursor-pointer rounded-md ${
                selectedOption === "email"
                  ? theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-200"
                  : ""
              }`}
              onClick={() => setSelectedOption("email")}
            >
              Email
            </div>
            <div
              className={`p-2 cursor-pointer rounded-md ${
                selectedOption === "password"
                  ? theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-200"
                  : ""
              }`}
              onClick={() => setSelectedOption("password")}
            >
              Password
            </div>
            <div
              className={`p-2 cursor-pointer rounded-md ${
                selectedOption === "socialMedia"
                  ? theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-200"
                  : ""
              }`}
              onClick={() => setSelectedOption("socialMedia")}
            >
              Social Media
            </div>
          </div>
          <div className="md:w-3/4 w-full p-4">
            <div
              className={`relative w-full rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
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
                {selectedOption.charAt(0).toUpperCase() +
                  selectedOption.slice(1)}{" "}
                Settings
              </h3>
              <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
                {renderForm()}
                <button
                  type="submit"
                  className={`w-full py-2 mt-4 font-bold text-white rounded-md ${
                    theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  {isLoading ? "Saving..." : "Save Settings"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SettingsPage;
