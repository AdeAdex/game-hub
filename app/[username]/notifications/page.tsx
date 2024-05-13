"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { UserDataType } from "@/app/types/user";
import FriendRequestCard from "@/app/components/userPage/notification/FriendRequestCard";
import Loader from "@/app/components/Loader";
import useMediaQuery from "@mui/material/useMediaQuery";
import FriendRequestCardMobile from "@/app/components/userPage/notification/FriendRequestCardMobile";

interface NotificationsPageProps {
  params: {
    username: string;
  };
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ params }) => {
  const { username } = params;
  const router = useRouter();
  const [active, setActive] = useState("all");
  const searchParams = useSearchParams();
  const [friendRequests, setFriendRequests] = useState<UserDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFullScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const statusFromUrl = searchParams?.get("status"); // Use optional chaining (?.) here
    setActive(statusFromUrl || "all");
  }, [searchParams]);

  const handleNotification = async (status: string) => {
    setActive(status);

    // Update the "status" query parameter
    const updatedParams = new URLSearchParams(searchParams?.toString() || "");
    updatedParams.set("status", status);

    // Push the updated URL with the new query parameter and shallow navigation
    router.push(`?${updatedParams.toString()}`);

    // Make a POST request to fetch users with friend requests
    if (status === "friend-requests") {
      try {
        setLoading(true);
        const response = await axios.post(
          `/api/username/notifications/friend-requests`,
          {
            username,
          }
        );

        if (response.data.message) {
          console.log("Friend Requests:", response.data.myFriendRequest);
          setFriendRequests(response.data.myFriendRequest || []);
        }
      } catch (error) {
        console.error("Error fetching users with friend requests:", error);
      } finally {
        setLoading(false);
      }
    }
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
          <div className="py-8 flex flex-wrap gap-4">
            {friendRequests.length > 0 ? (
              // Conditionally render based on screen size
              isFullScreen ? (
                // Render full-screen version if true
                friendRequests.map((friend) => (
                  <FriendRequestCard
                    key={friend._id}
                    friend={friend}
                    onConfirm={handleConfirm}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                // Render mobile version if false
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
              <div className="py-8 text-center text-gray-600">
                You don't have any friend requests.
              </div>
            )}
          </div>
        );

      case "messages":
        return <div className="py-8">You have new messages to read.</div>;
      case "payments":
        return <div className="py-8">You have pending payments.</div>;
      default:
        return <div className="py-8">Invalid status.</div>;
    }
  };

  const handleConfirm = (friend: UserDataType) => {
    // Handle confirm action
    console.log(
      `Confirm friend request from ${friend.firstName} ${friend.lastName}`
    );
  };

  const handleDelete = (friend: UserDataType) => {
    // Handle delete action
    console.log(
      `Delete friend request from ${friend.firstName} ${friend.lastName}`
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-[100px]">
      <Navbar />
      <div className="relative w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
        <h3 className="border-b border-gray-300 font-bold text-[#434343] md:text-[20px] pb-[30px]">
          Notifications Page
        </h3>
        <div className="flex gap-4 border-b border-gray-300 overflow-x-auto w-full notification-status-container">
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative whitespace-nowrap ${
              active === "all" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("all")}
          >
            All
            {renderActiveIndicator("all")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative whitespace-nowrap  ${
              active === "friend-requests" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("friend-requests")}
          >
            Friend Request
            {renderActiveIndicator("friend-requests")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative whitespace-nowrap ${
              active === "messages" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("messages")}
          >
            Messages
            {renderActiveIndicator("messages")}
          </button>
          <button
            className={`text-[#434343] hover:bg-gray-300 p-2 relative whitespace-nowrap ${
              active === "payments" ? "font-bold" : ""
            }`}
            onClick={() => handleNotification("payments")}
          >
            Payments
            {renderActiveIndicator("payments")}
          </button>
        </div>
        {loading ? (
          <div className="flex relative h-[300px]">
            <Loader />
          </div>
        ) : (
          renderNotificationContent() // Render notification content once loaded
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
