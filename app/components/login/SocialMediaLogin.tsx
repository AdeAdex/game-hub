"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, getProviders, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SocialMediaLogin = () => {
  // const [providers, setProviders] = useState<Record<string, Provider> | null>(
  //   null
  // );
  const [providers, setProviders] = useState<Record<string, Provider>>({});
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(
  //   () => {
  //     const setUpProvider = async () => {
  //       const response = await getProviders();
  //       setProviders(response as Record<string, Provider>);
  //       console.log(response);
        
  //     };
  //     setUpProvider();
  //   },
  //   []
  // );

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      const filteredProviders = Object.values(response  || {}).filter(
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
  

  useEffect(() => {
    if (session?.user) {
      console.log("socialMedia session: ",session?.user)
      redirect("/dashboard")      
    } 
  }, [session, router]);


  const handleSignIn = async (providerId: string) => {
    // Clear token before signing in with the provider
    // const response = await fetch("/api/outuser", {
    //   method: "POST", // Send a POST request to the logout endpoint
    // });

    // if (response.ok) {
    //   console.log("Logout successful");
    // } else {
    //   console.error("Logout failed:", response.statusText);
    // }

    signIn(providerId);
  };

  return (
    <>
      <div className="py-[25px]">
        <div className="text-[12px] font-bold">Or log in with another site</div>
        <div className="flex flex-col md:flex-row justify-between  w-full" >
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
