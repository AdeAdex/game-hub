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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image src={userData?.profilePicture || "/default-profile.png"} alt="Activity" width={24} height={24} />
                  </div>
                  <div className="text-lg text-gray-700">{activity.description}</div>
                  <div className="text-sm text-gray-500">{formatDateTime(activity.date)}</div>
                  <div className="text-sm text-gray-500">Device: {activity.device}</div>
                  <div className="text-sm text-gray-500">Location: {`Lat: ${activity?.location?.latitude}, Lon: ${activity?.location?.longitude}`}</div>
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
