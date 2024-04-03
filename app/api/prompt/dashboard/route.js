// app/api/dashboard/route.ts

import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { verifyToken } from "../../../utils/jwtUtils.js";
// import { cookies } from 'next/headers'
// import { getSession } from "next-auth/react";


  export const POST = async (req, res) => {
    try {
      // Get the session token from cookies
      const sessionToken = req.cookies.get("authToken");
      // console.log("Session token:", sessionToken);

  
      if (!sessionToken) {
        console.log("Session token not found");
        return NextResponse.json({
          success: false,
          error: "Session token not found",
        });
      }

      const token = sessionToken.value
      console.log("token:", token);

  
      // Verify the session token
      const decodedToken = await verifyToken(token);
  
      if (!decodedToken) {
        console.log("Invalid session token");
        return NextResponse.json({
          success: false,
          error: "Invalid session token",
        });
      }
  
      // Check if the session token is expired
      if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
        console.log("Session token has expired");
        return NextResponse.json({
          success: false,
          error: "Session token has expired",
        });
      }
  
      await connectToDb(); // Connect to the database
  
      // Find the user associated with the session token
      const user = await User.findOne({ email: decodedToken.email }).select(
        "-password"
      );
  
      if (!user) {
        console.log("User not found");
        return NextResponse.json({ success: false, error: "User not found" });
      }
  
      // Return success response with user data
      return NextResponse.json({ success: true, user });
    } catch (error) {
      console.error("Error handling POST request:", error);
      return NextResponse.json({
        success: false,
        error: "Internal Server Error",
      });
    }
  
};

