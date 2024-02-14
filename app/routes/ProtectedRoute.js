// app/routes/ProtectedRoute.js
'use client'

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  if (!token) {
    if (router.pathname !== "/login") {
      router.replace("/login");
    }
    return null; // Prevent rendering the children
  }

  // If token is present, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
