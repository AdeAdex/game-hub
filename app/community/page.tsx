"use client";

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { communityValidationSchema } from "@/app/components/validations/communityValidationSchema";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";

const CommunityPage: React.FC = () => {
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
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: communityValidationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await axios.post("/api/conversation/community", values);
        enqueueSnackbar(response.data.message || "Discussion posted successfully!", {
          variant: "success",
        });
        formik.resetForm();
      } catch (error: any) {
        console.error("Error posting discussion:", error.message);
        enqueueSnackbar("Failed to post discussion. Please try again.", {
          variant: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={`min-h-screen py-24 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-4/5 mx-auto rounded-sm border-2 py-8 px-4 md:px-8 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b text-2xl pb-8 font-bold ${
            theme === "dark"
              ? "border-gray-700 text-white"
              : "border-gray-300 text-gray-700"
          }`}
        >
          Community
        </h3>
        <div className="mt-4 space-y-8">
          <section className="community-section">
            <h4 className="text-xl font-semibold">Latest Discussions</h4>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className={`discussion-item bg-${
                  theme === "dark" ? "gray-700" : "white"
                } border rounded-md p-4 transition-transform transform hover:scale-105`}
              >
                <h5 className="text-lg font-medium">Discussion Title 1</h5>
                <p className="text-sm">
                  A brief description of the discussion topic. Click to read
                  more.
                </p>
                <div className="text-right">
                  <button className="text-blue-500">Read More</button>
                </div>
              </div>
              <div
                className={`discussion-item bg-${
                  theme === "dark" ? "gray-700" : "white"
                } border rounded-md p-4 transition-transform transform hover:scale-105`}
              >
                <h5 className="text-lg font-medium">Discussion Title 2</h5>
                <p className="text-sm">
                  A brief description of the discussion topic. Click to read
                  more.
                </p>
                <div className="text-right">
                  <button className="text-blue-500">Read More</button>
                </div>
              </div>
              <div
                className={`discussion-item bg-${
                  theme === "dark" ? "gray-700" : "white"
                } border rounded-md p-4 transition-transform transform hover:scale-105`}
              >
                <h5 className="text-lg font-medium">Discussion Title 3</h5>
                <p className="text-sm">
                  A brief description of the discussion topic. Click to read
                  more.
                </p>
                <div className="text-right">
                  <button className="text-blue-500">Read More</button>
                </div>
              </div>
            </div>
          </section>

          <section className="community-section">
            <h4 className="text-xl font-semibold">Top Contributors</h4>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className={`contributor-item bg-${
                  theme === "dark" ? "gray-700" : "white"
                } border rounded-md p-4 transition-transform transform hover:scale-105`}
              >
                <h5 className="text-lg font-medium">User 1</h5>
                <p className="text-sm">
                  A brief description of the top contributor. Click to view
                  profile.
                </p>
                <div className="text-right">
                  <button className="text-blue-500">View Profile</button>
                </div>
              </div>
              <div
                className={`contributor-item bg-${
                  theme === "dark" ? "gray-700" : "white"
                } border rounded-md p-4 transition-transform transform hover:scale-105`}
              >
                <h5 className="text-lg font-medium">User 2</h5>
                <p className="text-sm">
                  A brief description of the top contributor. Click to view
                  profile.
                </p>
                <div className="text-right">
                  <button className="text-blue-500">View Profile</button>
                </div>
              </div>
              <div
                className={`contributor-item bg-${
                  theme === "dark" ? "gray-700" : "white"
                } border rounded-md p-4 transition-transform transform hover:scale-105`}
              >
                <h5 className="text-lg font-medium">User 3</h5>
                <p className="text-sm">
                  A brief description of the top contributor. Click to view
                  profile.
                </p>
                <div className="text-right">
                  <button className="text-blue-500">View Profile</button>
                </div>
              </div>
            </div>
          </section>

          <section className="community-section">
            <h4 className="text-xl font-semibold">Join the Conversation</h4>
            <form
              className="mt-4 space-y-4 lg:mx-auto lg:w-3/4 xl:w-1/2"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="discussion-title"
                  className="w-full font-bold text-sm"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="discussion-title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    formik.errors.title && formik.touched.title
                      ? "register-input"
                      : ""
                  }`}
                  placeholder={
                    formik.touched.title && formik.errors.title
                      ? formik.errors.title
                      : "Enter the discussion title"
                  }
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="discussion-content"
                  className="w-full font-bold text-sm"
                >
                  Content
                </label>
                <textarea
                  id="discussion-content"
                  name="content"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    formik.errors.content && formik.touched.content
                      ? "register-input"
                      : ""
                  }`}
                  rows={5}
                  placeholder={
                    formik.touched.content && formik.errors.content
                      ? formik.errors.content
                      : "Enter the discussion content"
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Post Discussion"}
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CommunityPage;
