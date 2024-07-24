"use client";

import React, { useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import usageDescription from "./UsageDescription";

interface ApiKeyDisplayProps {
  apiKey: string;
  requestCount: number;
}

const ApiKeyDisplay: React.FC<ApiKeyDisplayProps> = ({
  apiKey,
  requestCount,
}) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp apiKey={apiKey} requestCount={requestCount} />
    </SnackbarProvider>
  );
};

function MyApp({ apiKey, requestCount }: ApiKeyDisplayProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [countries, setCountries] = useState<
    { country: string; code: string }[]
  >([]);
  const [countryDetails, setCountryDetails] = useState<
    { country: string; states: string[] }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const toggleApiKeyVisibility = () => {
    setShowApiKey((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      enqueueSnackbar(`API key copied successfully.`, { variant: "success" });
    });
  };

  useEffect(() => {
    // Fetch country dialing codes
    fetch("https://adex-game-hub.vercel.app/api/dial_code", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching dialing codes:", error));
  }, [apiKey]);

  useEffect(() => {
    // Fetch country details
    fetch("https://adex-game-hub.vercel.app/api/countries", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCountryDetails(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, [apiKey]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const countryDetail = countryDetails.find((c) => c.country === country);
    if (countryDetail) {
      setStates(countryDetail.states);
      const countryCode =
        countries.find((c) => c.country === country)?.code || "";
      setSelectedCountryCode(countryCode);
    } else {
      setStates([]);
      setSelectedCountryCode("");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="py-6 dark:bg-gray-900 bg-gray-100 text-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-semibold border-b dark:border-gray-700 dark:text-white border-gray-300">
          Developer API Key
        </h3>
        <div className="mt-4 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 border-gray-300">
          <div className="p-6">
            <p className="text-sm dark:text-gray-300 text-gray-700">
              Below is your unique API key. Keep it secure and avoid sharing it
              publicly.
            </p>
            <div className="mt-4">
              <div className="flex justify-between">
                <p className="font-semibold dark:text-gray-300 text-gray-700">
                  Your API Key:
                </p>
                <button
                  onClick={toggleApiKeyVisibility}
                  className="md:hidden text-sm my-auto dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  {showApiKey ? "Hide" : "Show"} API Key
                </button>
              </div>

              <div className="flex justify-between">
                <small
                  className={`mt-2 text-lg font-mono break-all dark:text-white text-gray-900 ${
                    showApiKey ? "" : "opacity-0"
                  }`}
                >
                  {apiKey}
                </small>
                <button
                  onClick={toggleApiKeyVisibility}
                  className="hidden md:flex text-sm my-auto dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  {showApiKey ? "Hide" : "Show"} API Key
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="mt-4 cursor-pointer transition-all bg-green-500 text-white px-3 py-1 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Copy API Key
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 border-gray-300 p-6">
          <h4 className="text-xl font-semibold dark:text-gray-300 text-gray-700">
            Request Count
          </h4>
          <p className="mt-2 text-lg dark:text-gray-300 text-gray-700">
            Your API key has been used <strong>{requestCount}</strong> time
            {requestCount === 1 ? "" : "s"}.
          </p>
        </div>

        {/* Country and State Form */}
        <div className="mt-6">
          <label
            htmlFor="country-select"
            className="block text-sm font-medium dark:text-gray-300 text-gray-700"
          >
            Select a Country
          </label>
          <select
            id="country-select"
            className="mt-2 p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-300"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            <option value="">Select a country</option>
            {countryDetails.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>

          {selectedCountry && (
            <>
              <label
                htmlFor="state-select"
                className="block mt-4 text-sm font-medium dark:text-gray-300 text-gray-700"
              >
                Select a State
              </label>
              <select
                id="state-select"
                className="mt-2 p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* Phone Number Form */}
        <div className="mt-6">
          <label
            htmlFor="phone-number"
            className="block text-sm font-medium dark:text-gray-300 text-gray-700"
          >
            Phone Number
          </label>
          <div className="mt-2 flex">
            <select
              id="dialing-code-select"
              className="p-2 border rounded-l-lg dark:bg-gray-800 dark:text-gray-300"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="phone-number"
              className="p-2 border rounded-r-lg flex-grow dark:bg-gray-800 dark:text-gray-300"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <p className="mt-4 text-sm dark:text-gray-300 text-gray-700">
          This API key grants access to developer resources and must be securely
          stored and managed.
        </p>
      </div>
    </div>
  );
}

export default ApiKeyDisplay;
