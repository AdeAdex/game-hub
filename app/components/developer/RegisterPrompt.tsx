import React from "react";

interface RegisterPromptProps {
  onRegisterClick: () => void;
  theme: string;
}

const RegisterPrompt: React.FC<RegisterPromptProps> = ({
  onRegisterClick,
  theme,
}) => {
  return (
    <>
      <h3
        className={`border-b md:text-[20px] pb-[30px] ${
          theme === "dark"
            ? "border-gray-700 text-white"
            : "border-gray-300 text-[#434343]"
        } font-bold`}
      >
        Register for API Key
      </h3>
      <div className="mt-4">
        <button
          onClick={onRegisterClick}
          className={`bg-blue-500 px-4 py-2 rounded ${theme === "dark" ? 'text-white' : 'text-white'}`}
        >
          Register for API Key
        </button>
        <p className={`mt-4 text-sm ${theme === "dark" ? 'text-white' : 'text-gray-600'}`}>
          By registering for an API key, you will gain access to our powerful
          developer tools and resources. This allows you to integrate our
          services seamlessly into your applications, enhance your project
          capabilities, and provide a better experience for your users. Join our
          developer community today and start building with us!
        </p>
      </div>
    </>
  );
};

export default RegisterPrompt;
