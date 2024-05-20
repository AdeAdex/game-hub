// app/api/dashboard/route.ts

import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import Activity from "../../../models/activity";
import { verifyToken } from "../../../utils/jwtUtils.js";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Get the session token from cookies
    const sessionToken = req.cookies.get("authToken");

    if (!sessionToken) {
      console.log("Session token not found");
      return NextResponse.json({
        success: false,
        error: "Session token not found",
      });
    }

    const token = sessionToken.value;

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
      "-password -resetPasswordToken -socialId"
    );

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ success: false, error: "User not found" });
    }

    // Get the login data for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const loginDataForMonth = user.loginData.filter((login) => {
      const loginDate = new Date(login.date);
      return (
        loginDate.getMonth() === currentMonth &&
        loginDate.getFullYear() === currentYear
      );
    });

    // Calculate login counts per day for the current month
    const loginCounts = Array.from({ length: 31 }, () => 0); // Assuming a maximum of 31 days in a month
    loginDataForMonth.forEach((login) => {
      const loginDate = new Date(login.date).getDate();
      loginCounts[loginDate - 1] += login.count;
    });

    // Fetch recent activities for the user
    const recentActivities = await Activity.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(10); // Adjust the limit as needed

    // Return success response with user data, login counts, and recent activities
    return NextResponse.json({
      success: true,
      user,
      loginCounts,
      recentActivities,
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
