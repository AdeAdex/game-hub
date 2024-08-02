"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerFormSchema } from "@/app/components/validations/apiValidationSchemas";
import { Country } from "@/app/types";


// console.log('NEXT_PUBLIC_COUNTRY_API_KEY:', process.env.NEXT_PUBLIC_COUNTRY_API_KEY);

interface RegisterFormProps {
  onSubmit: (formData: { appName: string; country: Country }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://country-dial-code-api.vercel.app/api/countries", {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_COUNTRY_API_KEY}`,
          },
        });

        // console.log("Response", response)

        if (!response.ok) {
          const errorDetails = await response.text(); // Get the response text for debugging
          throw new Error(`Network response was not ok: ${errorDetails}`);
        }

        const data = await response.json();
        // Sort countries alphabetically by name
        // console.log(data)
        const sortedCountries = data.sort((a: Country, b: Country) =>
          a.country.localeCompare(b.country)
        );
        setCountries(sortedCountries); 
      } catch (error: any) {
        console.log("Fetch error:", error.message); // Log the error message
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const formik = useFormik({
    initialValues: {
      appName: "",
      country: {} as Country, // Initialize with an empty object
    },
    validationSchema: registerFormSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="mt-4">
      {loading && <p>Loading countries...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="appName"
              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
            >
              App Name
            </label>
            <input
              type="text"
              id="appName"
              name="appName"
              value={formik.values.appName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:border-gray-700 bg-gray-700 border-gray-300 ${
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
            <label
              htmlFor="country"
              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formik.values.country.country || ""} // Ensure a default value
              onChange={(e) => {
                const selectedCountry = countries.find(
                  (country) => country.country === e.target.value
                );
                formik.setFieldValue("country", selectedCountry || {});
              }}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white border-gray-300 ${
                formik.errors.country && formik.touched.country
                  ? "register-input"
                  : ""
              }`}
            >
              <option value="" label="Select your country" />
              {countries.map((country) => (
                <option key={country.id} value={country.country} label={country.country} />
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
