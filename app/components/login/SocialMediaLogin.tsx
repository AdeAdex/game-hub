"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, getProviders } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SocialMediaLogin = () => {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );

  useEffect(
    () => {
      const setUpProvider = async () => {
        const response = await getProviders();
        setProviders(response as Record<string, Provider>);
        console.log(response);
        
      };
      setUpProvider();
    },
    []
  );

  return (
    <>
      <div className="py-[25px]">
        <div className="text-[12px] font-bold">Or log in with another site</div>
        <div className="flex flex-row justify-between  w-full" >
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              className="flex gap-3 mt-[10px] border border-[#FF2E51] py-[5px] px-4 rounded-sm"
              type="button"
              onClick={() => signIn(provider.id)}
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
