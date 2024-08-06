// /app/dashboard/page.tsx
"use client";

// Import React and necessary libraries
import React, { useEffect, useState } from "react";
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
import { useSearch } from "@/app/lib/SearchContext";
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from "../redux/authSlice";
import { RootState } from "../redux/store";


Chart.register(...registerables);

const DashboardPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  // const [userData, setUserData] = useState<UserDataType | null>(null);
  const [recentActivities, setRecentActivities] = useState<ActivityType[]>([]);
  const [loginCounts, setLoginCounts] = useState<number[]>([]);
  const { handleSearch, suggestions } = useSearch();
  const dispatch = useDispatch();
  const userInformation = useSelector((state: RootState) => state.auth.userInformation);

console.log("userinfo", userInformation)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/prompt/dashboard`);
        if (response.data.success) {
          dispatch(signInSuccess(response.data.user));
          // setUserData(response.data.user);
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
  }, [session, dispatch]);

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
          color: "dark:#CBD5E0 #4B5563", // Adjust ticks color based on theme
        },
      },
      x: {
        ticks: {
          color: "dark:#CBD5E0 #4B5563", // Adjust ticks color based on theme
        },
      },
    },
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col dark:bg-dark-mode dark:text-white bg-gray-50`}
    >
            <Navbar onSearch={handleSearch} suggestions={suggestions} />

      <div className="flex-grow container mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <UserProfile userData={userInformation} />
          <FlowDiagram chartData={chartData} chartOptions={chartOptions} />
        </div>
        <Activities
          recentActivities={recentActivities}
          userData={userInformation}
          formatDateTime={formatDateTime}
        />
        {/* <D3Chart /> */}
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
