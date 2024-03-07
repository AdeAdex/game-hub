// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Cookies from "universal-cookie";
import localforage from "localforage";
import CryptoJS from "crypto-js";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

const cookies = new Cookies();
const SECRET_KEY = "YOUR_SECRET_KEY";

const DashboardPage = () => {
  // const userData = useSelector((state: any) => state.auth.userInformation);
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userResponse, setUserResponse] = useState<any>(null);

  // const getCookie = (name: string) => {
  //   const cookies = document.cookie.split("; ");
  //   for (const cookie of cookies) {
  //     const [cookieName, cookieValue] = cookie.split("=");
  //     if (cookieName === name) {
  //       return cookieValue;
  //     }
  //   }
  //   return null;
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const encryptedData = await localforage.getItem<string>("userData");
        if (!encryptedData) return; // If no data found, return early

        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

        const storedUserData: UserData = JSON.parse(decryptedString);
        setUserData(storedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const token = cookies.get("loginToken");

    const fetchData = async () => {
      try {
        if (!token) {
          console.error("Token is missing or invalid");
          // router.push("/login");
          return; // Add return statement to prevent further execution
        }
        

        const response = await axios.get("/api/prompt/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // setUserData(response)
        if (!response.data) {
          console.log("No response data received");
          return;
        }

        setUserResponse(response);

        if (response?.data && response?.data.success == false) {
          console.log(response);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          return;
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [session, userResponse]);

  return (
    <div>
      <h2>User Data</h2>
      <Link href="/">Home</Link>
      {userData && userResponse && userResponse.data.success === true && (
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
