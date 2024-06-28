// /app/[username]/notification/page.tsx

"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { UserDataType } from "@/app/types/user";
import FriendRequestCard from "@/app/components/userPage/notification/FriendRequestCard";
import Loader from "@/app/components/Loader";
import useMediaQuery from "@mui/material/useMediaQuery";
import FriendRequestCardMobile from "@/app/components/userPage/notification/FriendRequestCardMobile";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext

interface NotificationsPageProps {
  params: {
    username: string;
  };
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ params }) => {
  const { theme } = useContext(ThemeContext); // Use ThemeContext to get the current theme
  const { username } = params;
  const router = useRouter();
  const [active, setActive] = useState("all");
  const searchParams = useSearchParams();
  const [friendRequests, setFriendRequests] = useState<UserDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFullScreen = useMediaQuery("(min-width:600px)");

  // Function to fetch friend requests based on active status
  const fetchFriendRequests = async (status: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/username/notifications/${status}`,
        {
          username,
        }
      );

      if (response.data.message) {
        setFriendRequests(response.data.results || []);
      }
    } catch (error) {
      console.error(`Error fetching ${status} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Handle initial data fetch and updates based on active status
  useEffect(() => {
    const statusFromUrl = searchParams?.get("status") || "all";
    setActive(statusFromUrl);
    fetchFriendRequests(statusFromUrl);
  }, [searchParams]);

  // Handle notification status change
  const handleNotification = async (status: string) => {
    setActive(status);

    const updatedParams = new URLSearchParams(searchParams?.toString() || "");
    updatedParams.set("status", status);
    router.push(`?${updatedParams.toString()}`);

    if (status === "friend-requests") {
      await fetchFriendRequests("friend-requests");
    }
  };

  // Handle confirmation of friend request
  const handleConfirm = (friend: UserDataType) => {
    console.log(
      `Confirm friend request from ${friend.firstName} ${friend.lastName}`
    );
    // Add confirmation logic here
  };

  // Handle deletion of friend request
  const handleDelete = (friend: UserDataType) => {
    console.log(
      `Delete friend request from ${friend.firstName} ${friend.lastName}`
    );
    // Add deletion logic here
  };

  // Render active indicator based on current status
  const renderActiveIndicator = (status: string) => {
    return active === status ? (
      <span className="absolute bottom-0 left-0 w-full text-center">
        <span className="h-1 w-auto bg-red-500 block"></span>
      </span>
    ) : null;
  };

  // Render notification content based on active status
  const renderNotificationContent = () => {
    switch (active) {
      case "all":
        return (
          <div className="py-8">You haven't received any notification yet.</div>
        );
      case "friend-requests":
        return (
          <div className="py-8 flex flex-wrap gap-4">
            {friendRequests.length > 0 ? (
              isFullScreen ? (
                friendRequests.map((friend) => (
                  <FriendRequestCard
                    key={friend._id}
                    friend={friend}
                    onConfirm={handleConfirm}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                friendRequests.map((friend) => (
                  <FriendRequestCardMobile
                    key={friend._id}
                    friend={friend}
                    onConfirm={handleConfirm}
                    onDelete={handleDelete}
                  />
                ))
              )
            ) : (
              <div
                className={`py-8 text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                You don't have any friend requests.
              </div>
            )}
          </div>
        );
      case "messages":
        return (
          <div className="py-8">You don't have any new messages to read.</div>
        );
      case "payments":
        return <div className="py-8">You don't have any pending payments.</div>;
      default:
        return <div className="py-8">Invalid status.</div>;
    }
  };

  return (
    <div
      className={`min-h-screen py-[100px] ${
        theme === "dark"
          ? "dark-mode-content text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b font-bold pb-[30px] ${
            theme === "dark"
              ? "border-gray-700 text-white"
              : "border-gray-300 text-[#434343]"
          } md:text-[20px]`}
        >
          Notifications Page
        </h3>
        <div className="flex gap-4 border-b overflow-x-auto w-full notification-status-container">
          {["all", "friend-requests", "messages", "payments"].map((status) => (
            <button
              key={status}
              className={`p-2 relative whitespace-nowrap border-0 focus:outline-none ${
                theme === "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-[#434343] hover:bg-gray-300"
              } ${active === status ? "font-bold" : ""}`}
              onClick={() => handleNotification(status)}
            >
              {status.charAt(0).toUpperCase() +
                status.slice(1).replace("-", " ")}
              {renderActiveIndicator(status)}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="flex relative h-[300px]">
            <Loader />
          </div>
        ) : (
          renderNotificationContent()
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
