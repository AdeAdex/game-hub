//  /api/username/accept-friends

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { userId, loggedInUserId } = body; // Added loggedInUserId

    console.log(userId, loggedInUserId);

    await connectToDb();

    // Find the user by ID and update their friends list
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the logged-in user's outgoingFriendRequests already include the friend's ID
    const loggedInUser = await User.findById(loggedInUserId);

    if (loggedInUser.currentFriends.includes(userId)) {
      console.log("You're already a friend");
      return NextResponse.json(
        { success: false, message: "You're already a friend" },
        { status: 400 }
      );
    }

    // Add the friend ID to the logged-in user's currentFriends
    loggedInUser.currentFriends.push(userId);
    await loggedInUser.save();

    // Remove userId from loggedInUser's outgoingFriendRequests
    loggedInUser.incomingFriendRequests =
      loggedInUser.incomingFriendRequests.filter(
        (id) => id.toString() !== userId
      );
    await loggedInUser.save();

    console.log("log out", loggedInUser.incomingFriendRequests);

    // Add loggedInUserId to user's currentFriends
    user.currentFriends.push(loggedInUserId);
    await user.save();

    // Remove loggedInUserId from user's incomingFriendRequests
    user.outgoingFriendRequests = user.outgoingFriendRequests.filter(
      (id) => id.toString() !== loggedInUserId
    );
    await user.save();

    console.log("user in", user.outgoingFriendRequests);

    return NextResponse.json({
      updatedUser: user,
      success: true,
      message: "Friend request accepted successfully",
    });
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
};
