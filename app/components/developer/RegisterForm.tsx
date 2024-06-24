'use client'

import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { useFormik } from "formik";
import { registerFormSchema } from "@/app/components/validations/apiValidationSchemas"; // Import validation schema
import { Country } from "@/app/types"; 


interface RegisterFormProps {
  onSubmit: (formData: { appName: string; country: Country }) => void;
  theme: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, theme }) => {
  const formik = useFormik({
    initialValues: {
      appName: "",
      country: "" as Country,
    },
    validationSchema: registerFormSchema, // Use the imported validation schema
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const countries: Country[] = [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "Japan",
        "China",
      ];

  return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="appName" className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            App Name
          </label>
          <input
            type="text"
            id="appName"
            name="appName"
            value={formik.values.appName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
              theme === "dark" ? "border-gray-700 bg-gray-700" : "border-gray-300"
            } ${
              formik.errors.appName && formik.touched.appName
                ? "register-input"
                : ""
            }`}
            placeholder={
              formik.touched.appName && formik.errors.appName
                ? formik.errors.appName
                : "Enter your app name"
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Country
          </label>
          <select
          id="country"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mt-1 block w-full px-3 py-2 border ${
            theme === "dark" ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300"
          } ${
            formik.errors.country && formik.touched.country
              ? "register-input"
              : ""
          }`}
        >
          <option value="" label="Select your country" />
          {countries.map((country) => (
            <option key={country} value={country} label={country} />
          ))}
        </select>

        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
  );
};

export default RegisterForm;
