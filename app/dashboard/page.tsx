// /app/dashboard/page.tsx

"use client";

// Import React and necessary libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { UserDataType, ActivityType } from "../types/user";
import LoadingSkeleton from "../components/dashboard/LoadingSkeleton";
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';


Chart.register(...registerables);

const DashboardPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [recentActivities, setRecentActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginCounts, setLoginCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/prompt/dashboard`);
        if (response.data.success) {
          setUserData(response.data.user);
          setLoginCounts(response.data.loginCounts);
          setRecentActivities(response.data.recentActivities);
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(
    new Date().getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) =>
    (i + 1).toString()
  );
  const data = labels.map((_, i) => loginCounts[i] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Login Count",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: "linear" as const,
        beginAtZero: true,
        ticks: {
          color: "#4B5563",
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
        },
      },
    },
  };

  if (loading) {
    return  <LoadingSkeleton/>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 md:py-20 ">
        {/* User Profile and Flow Diagram */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* User Profile */}
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8 md:mb-0 md:w-1/3 lg:w-1/4 text-center">
          {userData && (
              <div className="space-y-6">
                <div className="mx-auto rounded-full w-32 h-32 relative overflow-hidden border-4 border-gray-300">
                  <Image
                    src={userData.profilePicture || "/default-profile.png"}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {userData.userName}
                </div>
                <div className="text-lg text-gray-600">
                  {userData.firstName} {userData.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  {userData.email}
                </div>
                <div className="text-sm text-gray-500">
                  {userData.phone}
                </div>
                <div className="text-sm text-gray-500">
                  {userData.bio}
                </div>
                <div className="flex justify-center space-x-4">
      <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="w-6 h-6" />
      </a>
      <a href={userData.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="w-6 h-6" />
      </a>
      <a href={userData.facebook} target="_blank" rel="noopener noreferrer">
        <FaFacebook className="w-6 h-6" />
      </a>
    </div> 

                <div className="text-sm text-gray-500">
                  Role: {userData.role}
                </div>
                <div className="text-sm text-gray-500">
                  Status: {userData.status}
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Settings
                </button>
              </div>
            )}
          </div>

          {/* Flow Diagram */}
          <div className="bg-white shadow-lg rounded-lg p-8 flex-1 md:max-w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Login Flow Chart
            </h2>
            <div className="overflow-x-auto">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Recent Activities
          </h2>
          <ul className="space-y-4">
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={userData?.profilePicture || "/default-profile.png"}
                      alt="Activity"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text-lg text-gray-700 flex-1">
                    {activity.description}
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    {formatDateTime(activity.date)}
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    Device: {activity.device}
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    Location: {activity.location}
                  </div>
                </li>
              ))
            ) : (
              <div className="text-gray-500">No recent activities found</div>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;


// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const encryptedData = await localforage.getItem<string>("userData");
//       if (!encryptedData) {
//         throw new Error("User data not found in local storage");
//       }

//       const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//       const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

//       const storedUserData: UserData = JSON.parse(decryptedString);
//       setUserData(storedUserData);
//     } catch (error:any) {
//       console.error("Error fetching user data:", error.message);
//     }finally {
//       setLoading(false); // Set loading to false regardless of success or error
//     }
//   };

//   fetchUserData();
// }, []);

// import Cookies from "universal-cookie";
// import localforage from "localforage";
// import CryptoJS from "crypto-js";
