"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const NotificationsPage: React.FC = () => {
  const router = useRouter();
  const [active, setActive] = useState("all");
  const searchParams = useSearchParams();

  useEffect(() => {
    const statusFromUrl = searchParams?.get("status"); // Use optional chaining (?.) here
//     console.log(statusFromUrl)
    setActive(statusFromUrl || "all");
  }, [searchParams]);

  const handleNotification = (status: string) => {
    setActive(status);

    // Update the "status" query parameter
  const updatedParams = new URLSearchParams(searchParams?.toString() || "");
  updatedParams.set("status", status);

  // Push the updated URL with the new query parameter and shallow navigation
  router.push(`?${updatedParams.toString()}`);
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
        return (
          <div className="py-8">You haven't received any notification yet.</div>
        );
      case "friend-requests":
        return (
          <div className="py-8">You have friend requests waiting for you.</div>
        );
      case "messages":
        return <div className="py-8">You have new messages to read.</div>;
      case "payments":
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
        <div className="flex gap-4 border-b border-gray-300 overflow-x-auto w-full">
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
              active === "friend-requests" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("friend-requests")}
          >
            Friend Request
            {renderActiveIndicator("friend-requests")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative ${
              active === "messages" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("messages")}
          >
            Messages
            {renderActiveIndicator("messages")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative ${
              active === "payments" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("payments")}
          >
            Payments
            {renderActiveIndicator("payments")}
          </button>
        </div>
        {renderNotificationContent()}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
