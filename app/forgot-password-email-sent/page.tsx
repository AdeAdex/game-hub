import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Link from 'next/link'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

const ForgotPasswordEmailSentPage = () => {
  return (
        <div className="bg-[#F4F4F4] pt-[80px] md:pt-[100px] h-screen">
        <Navbar />
        <div className="relative  w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
          
          <div className="pt-[20px] pb-[10px]">
            <small className='flex gap-[10px]'>
            <IoMdCheckmark className='my-auto' size={20}/> A password reset link has been sent to your account's primary address.
            </small>
          </div>
          
          <div>
            <small>
              
              <Link href="/" className="text-[#FF2E51] underline flex">
              <IoIosArrowRoundBack className='my-auto' size={20}/> Return home
              </Link>
              .
            </small>
          </div>
        </div>
        <Footer />
      </div>
  )
}

export default ForgotPasswordEmailSentPage