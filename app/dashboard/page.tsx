// app/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// import { useDispatch } from "react-redux";
// import { signInSuccess } from "@/app/redux/authSlice";



interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.loginToken;
        if (!token) return;

        const response = await axios.get("/api/prompt/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        
        if (response.data.user) {
          setUserData(response.data.user);
          // dispatch(signInSuccess(response.data.user));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Data</h2>
      <Link href="/">Home</Link>
      {userData && (
        <div>
          <div>
            <strong>UserName:</strong> {userData.userName}
          </div>
          <div>
            <strong>First Name:</strong> {userData.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {userData.lastName}
          </div>
          <div>
            <strong>Email:</strong> {userData.email}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
