// /app/api/username/friends/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { userId } = body;

    // Connect to the database
    await connectToDb();

    // Find the user by username
    const existingUser = await User.findOne({ _id: userId });

    if (existingUser) {
      // Omit password field from the response
      existingUser.password = undefined;

      // Fetch all currentFriends for the existingUser
      const friendsDetails = await User.find({ _id: { $in: existingUser.currentFriends } });

      // Omit password field from each friend's details
      const sanitizedFriends = friendsDetails.map((friend) => {
        friend.password = undefined;
        return friend;
      });

      console.log("Current Friends:", sanitizedFriends);
      
      // Return the sanitized list of currentFriends
      return NextResponse.json(sanitizedFriends);
    } else {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
};
 
