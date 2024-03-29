// app/dashboard/page.tsx

"use client";
// export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import Cookies from "universal-cookie";
// import localforage from "localforage";
// import CryptoJS from "crypto-js";
import Navbar from "../components/navbar/Navbar";


interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

// const cookies = new Cookies();
const SECRET_KEY = "YOUR_SECRET_KEY";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  

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

  useEffect(() => {
    // const token = cookies.get("loginToken");

    const fetchData = async () => {
      try {
        
        const response = await axios.post(`/api/prompt/dashboard`);
        

        if (response.data.success === true) {
          setUserResponse(response.data)
          setUserData(response.data.user)
          setTimeout(() => {
            // router.push("/login");
          }, 3000);
        }
      } catch (error:any) {
        console.error("Error fetching user data:", error.message);
      }finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
      <h2>User Data</h2>
      {userData && userResponse && userResponse.success === true && (
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
