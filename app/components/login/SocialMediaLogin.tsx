import React from "react";
import { FaGithub } from "react-icons/fa";

const SocialMediaLogin = () => {
  return (
    <>
      <div className="py-[25px]">
        <div className="text-[12px] font-bold">Or log in with another site</div>
        <button className="flex gap-3 mt-[10px] border border-[#FF2E51] py-[5px] px-4 rounded-sm">
          <FaGithub size={25} />
          <span className="text-[#FF2E51]">Log in with GitHub</span>
        </button>
      </div>
    </>
  );
};

export default SocialMediaLogin;
