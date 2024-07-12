"use client";

import React from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { useFormik } from "formik";
import { uploadGameSchema } from "@/app/components/validations/uploadGameValidationSchema";

const UploadGamePage: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
    },
    validationSchema: uploadGameSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen py-[100px] bg-gray-100 text-gray-900 dark:bg-dark-mode dark:text-white">
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div className="relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] bg-white border-gray-300 dark:bg-dark-mode dark:border-gray-700">
        <h3 className="border-b md:text-[20px] pb-[30px] border-gray-300 text-[#434343] dark:border-gray-700 dark:text-white font-bold">
          Upload Your Game
        </h3>
        <div className="mt-4 w-full md:w-[50%]">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                placeholder={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : "Game Title"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className={`w-full px-4 py-2 border rounded bg-white border-gray-300 text-gray-900 dark:bg-dark-mode dark:border-gray-600 dark:text-white ${
                  formik.touched.title && formik.errors.title
                    ? "register-input"
                    : ""
                }`}
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : "Game Description"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className={`w-full px-4 py-2 border rounded h-32 bg-white border-gray-300 text-gray-900 dark:bg-dark-mode dark:border-gray-600 dark:text-white ${
                  formik.touched.description && formik.errors.description
                    ? "register-input"
                    : ""
                }`}
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }
                }}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-2 border rounded bg-white border-gray-300 text-gray-900 dark:bg-dark-mode dark:border-gray-600 dark:text-white ${
                  formik.touched.file && formik.errors.file
                    ? "register-input"
                    : ""
                }`}
                placeholder={
                  formik.touched.file && formik.errors.file
                    ? formik.errors.file
                    : undefined
                }
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-1/3 py-2 rounded bg-green-500 text-white hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadGamePage;
