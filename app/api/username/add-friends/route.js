//  /api/username/add-friends

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { userId, loggedInUserId } = body; // Added loggedInUserId

    await connectToDb();
    
    // Find the user by ID and update their friends list
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
    // Check if the logged-in user's outgoingFriendRequests already include the friend's ID
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser || loggedInUser.outgoingFriendRequests.includes(userId)) {
      return NextResponse.json({ success: false, message: 'Friend request already sent or user not found' }, { status: 400 });
    }
    
    // Add the friend ID to the logged-in user's outgoingFriendRequests
    loggedInUser.outgoingFriendRequests.push(userId);
    
    // Save the updated logged-in user
    await loggedInUser.save(); 

    // Update the friend's incomingFriendRequests
    user.incomingFriendRequests.push(loggedInUserId);
    await user.save();

    return NextResponse.json({ success: true, message: 'Friend request sent successfully' });
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
};
