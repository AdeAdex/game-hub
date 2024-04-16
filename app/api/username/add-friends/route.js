//  /api/username/add-friends

// /api/username/add-friends.js

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { userId } = body;

    await connectToDb();
    
    // Find the user by ID and update their friends list
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
    // Assuming userId is the ID of the friend to be added
    user.friends.push(userId); // Add the friend to the user's friends list
    await user.save(); // Save the updated user

    return NextResponse.json({ success: true, message: 'Friend added successfully' });
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
};

