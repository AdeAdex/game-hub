// /api/username/notifications/friend-requests/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "../../../../utils/database";
import User from "../../../../models/user";

export const POST = async (req) => {
  try {
    const { username } = await req.json();

//     console.log("user", username)

    await connectToDb();

    // Find the logged-in user by username and populate incomingFriendRequests with specific fields
    const user = await User.findOne({ userName: username })
      .populate({
        path: "incomingFriendRequests",
        select: "firstName lastName profilePicture", // Specify fields to include
      })
      .exec();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      results: user.incomingFriendRequests,
      success: true,
      message: "Users with pending friend requests retrieved successfully",
    });
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
};
