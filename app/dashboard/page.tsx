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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row items-center justify-between container mx-auto px-4 pt-16 md:pt-20 pb-8 bg-gray-100">
        {/* <h2 className="text-4xl font-bold mb-8 text-gray-800">User Dashboard</h2> */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl w-full">
          {userData && (
            <div className="space-y-6 text-center">
              <div className="mx-auto rounded-full w-32 h-32 relative mb-4 overflow-hidden">
                <Image
                  src={userData.profilePicture || "/default-profile.png"}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-lg font-medium text-gray-700">
                <div className="mb-2">
                  <strong className="mr-2">UserName:</strong>
                  <span>{userData.userName}</span>
                </div>
                <div className="mb-2">
                  <strong className="mr-2">First Name:</strong>
                  <span>{userData.firstName}</span>
                </div>
                <div className="mb-2">
                  <strong className="mr-2">Last Name:</strong>
                  <span>{userData.lastName}</span>
                </div>
                <div className="mb-2">
                  <strong className="mr-2">Email:</strong>
                  <span>{userData.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl w-full md:mt-[100px]">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login Flow Chart</h2>
          <Bar data={chartData} options={chartOptions} />
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

