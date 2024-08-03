"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerFormSchema } from "@/app/components/validations/apiValidationSchemas";
import { Country, RegisterFormValues } from "@/app/types";

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormValues) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false); // Added state for submitting

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // const response = await fetch("http://localhost:2500/api/countries", {
        const response = await fetch("https://country-dial-code-api.vercel.app/api/countries", {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_COUNTRY_API_KEY}`,
          },
        });

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Network response was not ok: ${errorDetails}`);
        }

        const data = await response.json();
        const sortedCountries = data.sort((a: Country, b: Country) =>
          a.country.localeCompare(b.country)
        );
        setCountries(sortedCountries);
      } catch (error: any) {
        console.log("Fetch error:", error.message);
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);
  

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find(
      (country) => country.country === e.target.value
    );
    setStates(selectedCountry?.states || []);
    formik.setFieldValue("country", e.target.value); // Set country as string
    formik.setFieldValue("state", ""); // Reset state
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      appName: "",
      country: "",
      state: "",
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      // console.log("Form values submitted:", values);
      try {
        await onSubmit(values);
      } catch (error: any) {
        console.error("Submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mt-4">
      {loading && <p>Loading countries please wait...</p>}
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
              value={formik.values.country || ""}
              onChange={handleCountryChange}
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
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
            >
              State
            </label>
            <select
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white border-gray-300 ${
                formik.errors.state && formik.touched.state
                  ? "register-input"
                  : ""
              }`}
            >
              <option value="" label="Select your state" />
              {states.map((state, index) => (
                <option key={index} value={state} label={state} />
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {submitting ? "Submitting..." : "Submit"} 
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
