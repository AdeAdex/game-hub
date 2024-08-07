"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { useSession } from "next-auth/react";
import axios from "axios";
import ApiKeyDisplay from "@/app/components/developer/ApiKeyDisplay";
import RegisterForm from "@/app/components/developer/RegisterForm";
import RegisterPrompt from "@/app/components/developer/RegisterPrompt";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/app/components/developer/LoadingSkeleton";
import { useSearch } from "@/app/lib/SearchContext";
import { RegisterFormValues } from "../types";


const DeveloperPage: React.FC = () => {
  const { data: session } = useSession();
  const [apiKey, setApiKey] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams?.get("action");
  const { handleSearch, suggestions } = useSearch();

  console.log(session?.user?.email)

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`/api/developer?user=${session.user.email}`)
        .then((response) => {
          // console.log("response", response.data)
          setApiKey(response.data.apiKey);
          setRequestCount(response.data.requestCount);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching API key:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleRegister = () => {
    setShowForm(true);
    // const newParams = new URLSearchParams(window.location.search);
    // newParams.set("action", "register-for-api");
    // router.push(`${window.location.pathname}?${newParams.toString()}`);
  };

  const handleFormSubmit = async (formData: RegisterFormValues) => {
    if (session?.user?.email) {
      try {
        const response = await axios.post("/api/developer", {
          email: session.user.email,
          ...formData,
        });
        setApiKey(response.data.apiKey);
        setShowForm(false);
      } catch (error) {
        console.error("Error registering for API key:", error);
      }
    }
  };

  // const handleFormSubmit = (formData: RegisterFormValues) => {
  //   console.log("Form submitted with data:", formData);
  //   // Add your API call or other logic here
  // };
  
  

  return (
    <div
      className={`min-h-screen py-[100px] dark:bg-dark-mode dark:text-white bg-gray-100 text-gray-900 `}
    >
            <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <div
        className={`w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 `}
      >
        {loading ? (
          <LoadingSkeleton />
        ) : session ? (
          apiKey ? (
            <ApiKeyDisplay apiKey={apiKey} requestCount={requestCount}/>
          ) : showForm ? (
            <RegisterForm onSubmit={handleFormSubmit} />
          ) : (
            <RegisterPrompt onRegisterClick={handleRegister} />
          )
        ) : (
          <p className={`text-sm dark:text-white text-gray-600 `}>
            Please log in to access the developer page and manage your API keys.
            If you do not have an account, please sign up to join our developer
            community.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperPage;
