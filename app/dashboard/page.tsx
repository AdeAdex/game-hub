// app/dashboard/page.tsx

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

"use client";


// Import React and necessary libraries
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
//import { Bar, ChartConfiguration, registerables } from "chart.js"; // Import Chart.js types

import { UserDataType } from "../types/user";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  //const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/prompt/dashboard`);
        if (response.data.success) {
          setUserResponse(response.data);
          setUserData(response.data.user);
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

/*  useEffect(() => {
    if (userData && userResponse && userResponse.success === true) {
      renderChart();
    }
    return () => {
      destroyChart();
    };
  }, [userData, userResponse]);

  const renderChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Register necessary Chart.js components
        Chart.register(...registerables);

        const chartConfig: ChartConfiguration<"bar"> = {
          type: "bar",
          data: {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                label: "Flow Data",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.4)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: [65, 59, 80, 81, 56, 55],
              },
            ],
          },
          options: {
            scales: {
              y: {
                type: "linear",
                beginAtZero: true,
              },
            },
          },
        };

        new Chart(ctx, chartConfig);
      }
    }
  };

  const destroyChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy the existing chart instance
        const chart = Chart.getChart(ctx);
        if (chart) {
          chart.destroy();
        }
      }
    }
  }; */

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-16 md:pt-20 h-screen">
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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pt-16 md:pt-20 pb-8">
        <h2 className="text-3xl font-semibold mb-8">User Data</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-lg w-full">
          {userData && userResponse && userResponse.success === true && (
            <div className="space-y-4">
              <div className="flex items-center">
                <strong className="mr-2">UserName:</strong>
                <span>{userData.userName}</span>
              </div>
              <div className="flex items-center">
                <strong className="mr-2">First Name:</strong>
                <span>{userData.firstName}</span>
              </div>
              <div className="flex items-center">
                <strong className="mr-2">Last Name:</strong>
                <span>{userData.lastName}</span>
              </div>
              <div className="flex items-center">
                <strong className="mr-2">Email:</strong>
                <span>{userData.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bar Chart Section */}
       {/* <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Flow Chart</h2>
          <canvas ref={chartRef} />
        </div>  */}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
