// /app/api/reset-password.js

import { NextResponse } from "next/server";
import User from "../../models/user";
import Activity from "../../models/activity";  // Import Activity model
import { connectToDb } from "../../utils/database";
import { hashPassword, comparePassword } from "@/app/utils/bcrypt";

// Function to log activity
const logActivity = async (userId, type, description) => {
  const activity = new Activity({
    userId,
    type,
    description,
  });
  await activity.save();
};

export const POST = async (req, res) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { token, password } = await req.json();
    console.log("new password", password)

    if (!token || !password) {
      return NextResponse.json({ error: "Token or password is missing" }, { status: 400 });
    }

    // Connect to the database
    await connectToDb();

    // Find the user by the reset password token
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      console.log("Invalid token or user not found");
      return NextResponse.json({ error: "Invalid token or user not found" }, { status: 404 });
    }
    
    // Check if the new password is the same as the existing password
    const isSamePassword = await comparePassword(password, user.password);
    if (isSamePassword) {
      console.log("New password matches existing password");
      return NextResponse.json({ error: "New password cannot be the same as the existing password" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    // Update the user's password and clear the reset password token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    // Log the password change activity
    await logActivity(user._id, 'password_change', 'User changed password');

    console.log("Password reset successfully");
    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
