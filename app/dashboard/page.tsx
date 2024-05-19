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
import { UserDataType } from "../types/user";

Chart.register(...registerables);

const DashboardPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginCounts, setLoginCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/prompt/dashboard`);
        if (response.data.success) {
          setUserData(response.data.user);
          setLoginCounts(response.data.loginCounts);
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

  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
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
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse bg-white shadow-lg rounded-lg p-6 mb-8 max-w-lg w-full">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 md:py-20">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto w-full text-center">
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
              <div className="text-2xl font-bold text-gray-800">{userData.userName}</div>
              <div className="text-lg text-gray-600">{userData.firstName} {userData.lastName}</div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login Flow Chart</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image src="/activity-icon.png" alt="Activity" width={24} height={24} />
              </div>
              <div className="text-lg text-gray-700">Logged in from New York</div>
              <div className="text-sm text-gray-500">2023-05-01</div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image src="/activity-icon.png" alt="Activity" width={24} height={24} />
              </div>
              <div className="text-lg text-gray-700">Changed password</div>
              <div className="text-sm text-gray-500">2023-04-30</div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image src="/activity-icon.png" alt="Activity" width={24} height={24} />
              </div>
              <div className="text-lg text-gray-700">Updated profile information</div>
              <div className="text-sm text-gray-500">2023-04-28</div>
            </li>
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

