"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { signInSuccess } from "@/app/redux/authSlice";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SocialMediaLogin = () => {
  const [providers, setProviders] = useState<Record<string, Provider>>({});
  const { data: session } = useSession();
   const dispatch = useDispatch();

  

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      const filteredProviders = Object.values(response || {}).filter(
        (provider) => provider.name === "Google" || provider.name === "GitHub"
      );
      const providersObject = filteredProviders.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, Provider>);
      setProviders(providersObject);
    };
    setUpProvider();
  }, []);

 
  const handleSignIn = async (providerId: string) => {
    
    try {
      // const result = await signIn(providerId);
      // console.log("provider result", result)
      const result = await signIn(providerId, { redirect: false });
      if (result?.ok && session?.user) {
        dispatch(signInSuccess(session.user)); // Dispatch user information to Redux store
      }
      console.log("provider result", result);
    } catch (error: any) {
      console.error("Error during login:", error.message);
    } 

  };

  return (
    <>
      <div className="py-[25px]">
        <div className="text-[12px] font-bold">Or log in with another site</div>
        <div className="flex flex-col md:flex-row justify-between md:justify-start md:gap-4 w-full">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                className="flex gap-3 mt-[10px] border border-[#FF2E51] py-[5px] px-4 rounded-sm justify-center"
                type="button"
                onClick={() => handleSignIn(provider.id)}
                key={provider.name}
              >
                {provider.name == "Google" ? (
                  <FcGoogle size={25} />
                ) : (
                  <FaGithub size={25} />
                )}
                <span className="text-[#FF2E51]">
                  Log in with {provider.name}
                </span>
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default SocialMediaLogin;
