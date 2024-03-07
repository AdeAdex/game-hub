import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import localforage from "localforage";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

const SECRET_KEY = "YOUR_SECRET_KEY";

const DashboardClient = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const encryptedData = await localforage.getItem<string>("userData");
        if (!encryptedData) return;

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

  return (
    <div>
      <h2>User Data</h2>
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

export default DashboardClient;
