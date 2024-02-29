// app/dashboard/page.tsx
"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";





interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

const DashboardPage = () => {
  const userData = useSelector((state: any) => state.auth.userInformation);
  const router = useRouter();
  const { data: session } = useSession();

  
  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
    } 
  }, [session]);


  useEffect(() => {
    console.log(userData);
    
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

        if (!response.data.success) {
          router.push('/login')
          
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
