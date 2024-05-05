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
import Footer from "../components/footer/Footer";


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
    // const token = cookies.get("authToken");

    const fetchData = async () => {
      try {
        
        const response = await axios.post(`/api/prompt/dashboard`);
        
        // console.log(response)

        if (response.data.success === true) {
          setUserResponse(response.data)
          setUserData(response.data.user)
          
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
      <Navbar/>
      <div className="flex flex-col items-center justify-center pt-16 md:pt-20 h-screen">
        <h2 className="py-8 text-3xl font-semibold">User Data</h2>
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
        {/* Flow Diagram */}
          </div>
      <Footer/>
     
    </div>
  );
};

export default DashboardPage;
