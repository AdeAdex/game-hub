// /app/dashboard/page.tsx
"use client";

// Import React and necessary libraries
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Chart, registerables } from "chart.js";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import LoadingSkeleton from "../components/dashboard/LoadingSkeleton";
import UserProfile from "../components/dashboard/UserProfile";
import FlowDiagram from "../components/dashboard/FlowDiagram";
import Activities from "../components/dashboard/Activities";
import { UserDataType, ActivityType } from "../types/user";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import ThemeContext
import D3Chart from "../components/dashboard/D3Chart";

Chart.register(...registerables);

const DashboardPage = () => {
  const { data: session } = useSession();
  const { theme } = useContext(ThemeContext); // Get the current theme
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
        console.error("Error fetching user data:", error.message);
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
          color: theme === "dark" ? "#CBD5E0" : "#4B5563", // Adjust ticks color based on theme
        },
      },
      x: {
        ticks: {
          color: theme === "dark" ? "#CBD5E0" : "#4B5563", // Adjust ticks color based on theme
        },
      },
    },
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navbar onSearch={(query) => {}} suggestions={[]}/>
      <div className="flex-grow container mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <UserProfile userData={userData} />
          <FlowDiagram chartData={chartData} chartOptions={chartOptions} />
        </div>
        <Activities recentActivities={recentActivities} userData={userData} formatDateTime={formatDateTime} />
        <h1 className="mt-8">My D3.js Visualization</h1>
        <D3Chart />
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
