"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Hero from "@/app/components/register/hero/Hero";
import RegisterForm from "@/app/components/register/form/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="w-full bg-[#F4F4F4]">
      <Navbar />
      <div className="w-full lg:w-[60%] mx-auto mt-[1px] md:mt-6 bg-white rounded-sm border-2 border-gray-300">
        <h3 className="py-[30px] border-b border-gray-300 px-[10px] md:px-[30px] font-bold text-[#434343] md:text-[20px] ">
          Log in to your game hub account
        </h3>
        <div className="w-full flex flex-col md:flex-row px-5 gap-[50px]">
          <RegisterForm />
          <div className="border border-1 "></div>
          <Hero/>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RegisterPage;
