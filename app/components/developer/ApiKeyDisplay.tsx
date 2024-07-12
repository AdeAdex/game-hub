"use client";

import React, { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

interface ApiKeyDisplayProps {
  apiKey: string;
  // theme: string;
}

const ApiKeyDisplay: React.FC<ApiKeyDisplayProps> = ({ apiKey }) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp apiKey={apiKey} />
    </SnackbarProvider>
  );
};

function MyApp({ apiKey }: ApiKeyDisplayProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const toggleApiKeyVisibility = () => {
    setShowApiKey((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      enqueueSnackbar(`API key copied successfully.`, { variant: "success" });
    });
  };

  return (
    <div className={`py-6 dark:bg-gray-900 bg-gray-100 text-gray-800 `}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3
          className={`text-3xl font-semibold border-b  dark:border-gray-700 dark:text-white border-gray-300`}
        >
          Developer API Key
        </h3>
        <div
          className={`mt-4 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 border-gray-300 `}
        >
          <div className="p-6">
            <p className={`text-sm dark:text-gray-300 text-gray-700`}>
              Below is your unique API key. Keep it secure and avoid sharing it
              publicly.
            </p>
            <div className="mt-4">
              <div className="flex justify-between">
                <p className={`font-semibold dark:text-gray-300 text-gray-700`}>
                  Your API Key:
                </p>
                <button
                  onClick={toggleApiKeyVisibility}
                  className={`md:hidden text-sm my-auto dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-gray-900  focus:outline-none`}
                >
                  {showApiKey ? "Hide" : "Show"} API Key
                </button>
              </div>

              <div className="flex justify-between">
                <small
                  className={`mt-2 text-lg font-mono break-all dark:text-white text-gray-900  ${
                    showApiKey ? "" : "opacity-0"
                  }`}
                >
                  {apiKey}
                </small>
                <button
                  onClick={toggleApiKeyVisibility}
                  className={`hidden md:flex text-sm my-auto dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-gray-900 focus:outline-none`}
                >
                  {showApiKey ? "Hide" : "Show"} API Key
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="mt-4 cursor-pointer transition-all bg-green-500 text-white px-3 py-1 rounded-lg
border-green-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Copy API Key
              </button>
            </div>
          </div>
        </div>
        <p className={`mt-4 text-sm dark:text-gray-300 text-gray-700 `}>
          This API key grants access to developer resources and must be securely
          stored and managed.
        </p>
      </div>
    </div>
  );
}

export default ApiKeyDisplay;
