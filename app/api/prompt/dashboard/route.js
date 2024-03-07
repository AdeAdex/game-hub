import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { verifyToken } from "../../../utils/jwtUtils.js";

export const GET = async (req, res) => {
  try {
    const authorizationHeader = req.headers.get("authorization");

    if (!authorizationHeader) {
      return NextResponse.json({
        success: false,
        error: "Authorization header missing",
      });
    }

    const token = authorizationHeader.split("Bearer ")[1];
    // console.log("token", token);

    if (!token) {
      return NextResponse.json({
        success: false,
        error: "Invalid token format",
      });
    }

    const decodedToken = await verifyToken(token);
    // console.log(decodedToken);

    if (!decodedToken) {
      return NextResponse.json({ success: false, error: "Invalid token" });
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
