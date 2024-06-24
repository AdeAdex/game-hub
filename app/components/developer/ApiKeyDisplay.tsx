"use client";

import React, { useState } from "react";

interface ApiKeyDisplayProps {
  apiKey: string;
  theme: string;
}

const ApiKeyDisplay: React.FC<ApiKeyDisplayProps> = ({ apiKey, theme }) => {
  const [showApiKey, setShowApiKey] = useState(false);

  const toggleApiKeyVisibility = () => {
    setShowApiKey((prev) => !prev);
  };

  return (
    <div
      className={`py-6 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } text-gray-800`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3
          className={`text-3xl font-semibold border-b ${
            theme === "dark" ? "border-gray-700 text-white" : "border-gray-300"
          }`}
        >
          Developer API Key
        </h3>
        <div
          className={`mt-4 rounded-lg overflow-hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-md border ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="p-6">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Below is your unique API key. Keep it secure and avoid sharing it
              publicly.
            </p>
            <div className="mt-4">
                <div className="flex justify-between">
                <p
                className={`font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Your API Key:
              </p>
                <button
                  onClick={toggleApiKeyVisibility}
                  className={`md:hidden text-sm my-auto ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } focus:outline-none`}
                >
                  {showApiKey ? "Hide" : "Show"} API Key
                </button>
                </div>
             
              <div className="flex justify-between">
                <p
                  className={`mt-2 text-lg font-mono ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  } ${showApiKey ? "" : "opacity-0"}`}
                >
                  {apiKey}
                </p>
                <button
                  onClick={toggleApiKeyVisibility}
                  className={`hidden md:flex text-sm my-auto ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } focus:outline-none`}
                >
                  {showApiKey ? "Hide" : "Show"} API Key
                </button>
              </div>
            </div>
          </div>
        </div>
        <p
          className={`mt-4 text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          This API key grants access to developer resources and must be securely
          stored and managed.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyDisplay;
