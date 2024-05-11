"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";

// interface NotificationsPageProps {
//         params: {
//           username: string;
//         };
//       }

const NotificationsPage: React.FC /* <NotificationsPageProps> */ = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8  mt-[60px]">
        Notification Page
      </div>
    </div>
  );
};

export default NotificationsPage;
