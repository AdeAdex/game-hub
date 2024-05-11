"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const NotificationsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const status = searchParams.get('status')
  const [active, setActive] = useState("all");

  useEffect(() => {
    alert(status)
    setActive("all");
  }, []);

//    useEffect(() => {
//     const status = getQueryParam(navigation, "status") || "all";
//     setActive(status);
//   }, [navigation]);

  const handleNotification = (status: string) => {
    setActive(status);
    //     router.push(`/notifications?status=${status}`);
  };

  const renderActiveIndicator = (status: string) => {
    return active === status ? (
      <span className="absolute bottom-0 left-0 w-full text-center">
        <span className="h-1 w-auto bg-red-500 block"></span>
      </span>
    ) : null;
  };

  const renderNotificationContent = () => {
    // Render content based on active status
    switch (active) {
      case "all":
        return <div className="py-8">You haven't received any notification yet.</div>;
      case "fr":
        return <div className="py-8">You have friend requests waiting for you.</div>;
      case "m":
        return <div className="py-8">You have new messages to read.</div>;
      case "p":
        return <div className="py-8">You have pending payments.</div>;
      default:
        return <div className="py-8">Invalid status.</div>;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-[100px]">
      <Navbar />
      <div className="relative w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
        <h3 className="border-b border-gray-300 font-bold text-[#434343] md:text-[20px] pb-[30px]">
          Notifications Page
        </h3>
        <div className="flex gap-4 border-b border-gray-300">
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative ${
              active === "all" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("all")}
          >
            All
            {renderActiveIndicator("all")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative ${
              active === "fr" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("fr")}
          >
            Friend Request
            {renderActiveIndicator("fr")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative ${
              active === "m" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("m")}
          >
            Messages
            {renderActiveIndicator("m")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative ${
              active === "p" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("p")}
          >
            Payments
            {renderActiveIndicator("p")}
          </button>
        </div>
        {renderNotificationContent()}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
