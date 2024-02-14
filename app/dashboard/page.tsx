// app/dashboard/page.tsx
"use client";

import React from "react";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    userInfo: {
      firstName: string;
      lastName: string;
      email: string;
      userName: string;
    };
    token: string;
  };
}

const DashboardPage = () => {
  const userData = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);

  console.log(userData);
  console.log(token);

  return (
    <ProtectedRoute>
      <div>
        <h2>User Data</h2>
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
    </ProtectedRoute>
  );
};

export default DashboardPage;
