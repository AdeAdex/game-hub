import Footer from "@/app/components/footer/Footer";
import Form from "@/app/components/login/Form";
import SocialMediaLogin from "@/app/components/login/SocialMediaLogin";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
      <>
      <div className=" w-full lg:w-1/3 mx-auto mt-[1px] md:mt-6 bg-white rounded-sm">
        <h3 className="py-[30px] border-b border-gray-300 px-[10px] md:px-[30px] font-bold text-[#434343] md:text-[20px] ">
          Log in to your game hub account
        </h3>
        <div className="mt-[35px] px-[10px] md:px-[30px] text-[14px] text-[#434343]">
         <Form/>
         <SocialMediaLogin/>
        </div>
        <hr />
        <div className="text-[14px] py-[15px] px-[10px] md:px-[30px]">
          <Link href="" className="underline">
            Looking for something you bought?
          </Link>
        </div>
      </div>
      <Footer/>
      </>
  );
};

export default LoginPage;
