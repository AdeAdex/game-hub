// // /app/[username]/notification/page.tsx

// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/app/components/navbar/Navbar";
// import Footer from "@/app/components/footer/Footer";
// import axios from "axios";
// import { UserDataType, FriendRequestType } from "@/app/types/user";
// import FriendRequestCard from "@/app/components/userPage/notification/FriendRequestCard";
// import Loader from "@/app/components/Loader";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import FriendRequestCardMobile from "@/app/components/userPage/notification/FriendRequestCardMobile";
// import { useSearch } from "@/app/lib/SearchContext";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";


// interface NotificationsPageProps {
//   params: {
//     username: string;
//   };
// }

// const NotificationsPage: React.FC<NotificationsPageProps> = ({ params }) => {
//   const { username } = params;
//   const router = useRouter();
//   const [active, setActive] = useState("all");
//   const searchParams = useSearchParams();
//   // const [friendRequests, setFriendRequests] = useState<UserDataType[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const isFullScreen = useMediaQuery("(min-width:600px)");
//   const { handleSearch, suggestions } = useSearch();
//   const userInformation = useSelector(
//     (state: RootState) => state.auth.userInformation
//   ) as UserDataType | null;
//   const friendRequests: FriendRequestType[] = userInformation?.incomingFriendRequests || [];
//   const totalNotifications =
//     (userInformation?.incomingFriendRequests?.length || 0) + (userInformation?.messages?.length || 0) + (userInformation?.payments?.length || 0);



//     // Function to fetch friend requests based on active status
//     // const fetchFriendRequests = useCallback(async (status: string) => {
//     //   try {
//     //     setLoading(true);
//     //     const response = await axios.post(
//     //       `/api/username/notifications/${status}`,
//     //       {
//     //         username,
//     //       }
//     //     );
  
//     //     if (response.data.message) {
//     //       console.log("results",response.data.results)
//     //       setFriendRequests(response.data.results || []);
//     //     }
//     //   } catch (error) {
//     //     console.error(`Error fetching ${status} data:`, error);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // }, [username]);
  
//     // Handle initial data fetch and updates based on active status
//     useEffect(() => {
//       const statusFromUrl = searchParams?.get("status") || "all";
//       setActive(statusFromUrl);
//       // fetchFriendRequests(statusFromUrl);
//     }, [searchParams]);

//   // Handle notification status change
//   const handleNotification = async (status: string) => {
//     setActive(status);

//     const updatedParams = new URLSearchParams(searchParams?.toString() || "");
//     updatedParams.set("status", status);
//     router.push(`?${updatedParams.toString()}`);

//     // if (status === "friend-requests") {
//     //   await fetchFriendRequests("friend-requests");
//     // }
//   };

//   // Handle confirmation of friend request
//   const handleConfirm = (friend: UserDataType) => {
//     console.log(
//       `Confirm friend request from ${friend.firstName} ${friend.lastName}`
//     );
//     // Add confirmation logic here
//   };

//   // Handle deletion of friend request
//   const handleDelete = (friend: UserDataType) => {
//     console.log(
//       `Delete friend request from ${friend.firstName} ${friend.lastName}`
//     );
//     // Add deletion logic here
//   };

//   // Render active indicator based on current status
//   const renderActiveIndicator = (status: string) => {
//     return active === status ? (
//       <span className="absolute bottom-0 left-0 w-full text-center">
//         <span className="h-1 w-auto bg-red-500 block"></span>
//       </span>
//     ) : null;
//   };

//   // Render notification content based on active status
//   const renderNotificationContent = () => {
//     switch (active) {
//       case "all":
//         return (
//           <div className="py-8">You haven't received any notification yet.</div>
//         );
//       case "friend-requests":
//         // const friendRequests = userInformation?.incomingFriendRequests || []; 
//         return (
//           <div className="py-8 flex flex-wrap gap-4">
//             {friendRequests.length > 0 ? (
//               isFullScreen ? (
//                 friendRequests.map((friend) => (
//                   <FriendRequestCard
//                     key={friend._id}
//                     friend={friend}
//                     onConfirm={handleConfirm}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               ) : (
//                 friendRequests.map((friend) => (
//                   <FriendRequestCardMobile
//                     key={friend._id}
//                     friend={friend}
//                     onConfirm={handleConfirm}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               )
//             ) : (
//               <div
//                 className={`py-8 text-center dark:text-gray-400 text-gray-600`}
//               >
//                 You don't have any friend requests.
//               </div>
//             )}
//           </div>
//         );
//       case "messages":
//         return (
//           <div className="py-8">You don't have any new messages to read.</div>
//         );
//       case "payments":
//         return <div className="py-8">You don't have any pending payments.</div>;
//       default:
//         return <div className="py-8">Invalid status.</div>;
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen py-[100px] dark:bg-dark-mode dark:text-white bg-gray-100 text-black`}
//     >
//             <Navbar onSearch={handleSearch} suggestions={suggestions} />

//       <div
//         className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300`}
//       >
//         <h3
//           className={`border-b font-bold pb-[30px] dark:border-gray-700 dark:text-white border-gray-300 text-[#434343] md:text-[20px]`}
//         >
//           Notifications Page
//         </h3>
//         <div className="flex gap-4 border-b overflow-x-auto w-full notification-status-container">
//           {["all", "friend-requests", "messages", "payments"].map((status) => (
//             <button
//               key={status}
//               className={`p-2 relative whitespace-nowrap border-0 focus:outline-none dark:text-white dark:hover:bg-gray-700 text-[#434343] hover:bg-gray-300 ${
//                 active === status ? "font-bold" : ""
//               }`}
//               onClick={() => handleNotification(status)}
//             >
//               {status.charAt(0).toUpperCase() +
//                 status.slice(1).replace("-", " ")}
//               {renderActiveIndicator(status)}
//             </button>
//           ))}
//         </div>
//         {loading ? (
//           <div className="flex relative h-[300px]">
//             <Loader />
//           </div>
//         ) : (
//           renderNotificationContent()
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default NotificationsPage;




"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";
import { UserDataType, FriendRequestType } from "@/app/types/user";
import FriendRequestCard from "@/app/components/userPage/notification/FriendRequestCard";
import Loader from "@/app/components/Loader";
import useMediaQuery from "@mui/material/useMediaQuery";
import FriendRequestCardMobile from "@/app/components/userPage/notification/FriendRequestCardMobile";
import { useSearch } from "@/app/lib/SearchContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";


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
  const [loading, setLoading] = useState<boolean>(false);
  const isFullScreen = useMediaQuery("(min-width:600px)");
  const { handleSearch, suggestions } = useSearch();
  const userInformation = useSelector(
    (state: RootState) => state.auth.userInformation
  ) as UserDataType | null;

  const totalNotifications =
    (userInformation?.incomingFriendRequests?.length || 0) + (userInformation?.messages?.length || 0) + (userInformation?.payments?.length || 0);


  const friendRequests: FriendRequestType[] = userInformation?.incomingFriendRequests || [];
  const messages = userInformation?.messages || [];
  const payments = userInformation?.payments || [];

  const friendRequestCount = friendRequests.length;
  const messageCount = messages.length;
  const paymentCount = payments.length;

  // Handle initial data fetch and updates based on active status
  useEffect(() => {
    const statusFromUrl = searchParams?.get("status") || "all";
    setActive(statusFromUrl);
  }, [searchParams]);

  // Handle notification status change
  const handleNotification = async (status: string) => {
    setActive(status);

    const updatedParams = new URLSearchParams(searchParams?.toString() || "");
    updatedParams.set("status", status);
    router.push(`?${updatedParams.toString()}`);
  };

  // Handle confirmation of friend request
  const handleConfirm = (friend: UserDataType) => {
    console.log(
      `Confirm friend request from ${friend.firstName} ${friend.lastName}`
    );
  };

  // Handle deletion of friend request
  const handleDelete = (friend: UserDataType) => {
    console.log(
      `Delete friend request from ${friend.firstName} ${friend.lastName}`
    );
  };

  // Render active indicator based on current status
  const renderActiveIndicator = (status: string) => {
    return active === status ? (
      <span className="absolute bottom-0 left-0 w-full text-center">
        <span className="h-1 w-auto bg-red-500 block"></span>
      </span>
    ) : null;
  };

  // Render notification count badge
  const renderNotificationCountBadge = (count: number) => {
    return count > 0 ? (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
        {count}
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
                className={`py-8 text-center dark:text-gray-400 text-gray-600`}
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
      className={`min-h-screen py-[100px] dark:bg-dark-mode dark:text-white bg-gray-100 text-black`}
    >
      <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300`}
      >
        <h3
          className={`border-b font-bold pb-[30px] dark:border-gray-700 dark:text-white border-gray-300 text-[#434343] md:text-[20px]`}
        >
          Notifications Page
        </h3>
        <div className="relative flex gap-4 border-b overflow-x-auto w-full notification-status-container">
          {[
            { status: "all", count: totalNotifications },
            { status: "friend-requests", count: friendRequestCount },
            { status: "messages", count: messageCount },
            { status: "payments", count: paymentCount }
          ].map(({ status, count }) => (
            <button
              key={status}
              className={`relative p-2 whitespace-nowrap border-0 focus:outline-none dark:text-white dark:hover:bg-gray-700 text-[#434343] hover:bg-gray-300 ${
                active === status ? "font-bold" : ""
              }`}
              onClick={() => handleNotification(status)}
            >
              {status.charAt(0).toUpperCase() +
                status.slice(1).replace("-", " ")}
              {renderActiveIndicator(status)}
              {renderNotificationCountBadge(count)}
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
