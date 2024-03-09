// app/api/dashboard/route.ts

import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { verifyToken } from "../../../utils/jwtUtils.js";
import { cookies } from 'next/headers'
import { getSession } from "next-auth/react";


  export const POST = async (req, res) => {
  try {
    // const authorizationHeader = req.headers.get("authorization");
    const cookieStore = cookies()
    // const session =getSession({req})
    // console.log(session)
    const tokenDetails = cookieStore.get('loginToken')

    if (!tokenDetails) {
      console.log("Invalid token format")
      return NextResponse.json({
        success: false,
        error: "Invalid token format",
      });
    }

    const token = tokenDetails.value

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      return NextResponse.json({ success: false, error: "Invalid token" });
    }

    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      console.log("Token has expired in middleware");
      return errorResponse(res, "Token has expired in dashboard", StatusCodes.UNAUTHORIZED);
    }
   

    await connectToDb(); // Connect to the database
    const user = await User.findOne({ email: decodedToken.email }).select(
      "-password"
    ); // Remove the password from what will be sent

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    // User found, return success response with user data
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

