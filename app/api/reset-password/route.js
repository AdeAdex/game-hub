// /app/api/reset-password.js

import { NextResponse } from "next/server";
import User from "../../models/user";
import { connectToDb } from "../../utils/database";
import { hashPassword } from "@/app/utils/bcrypt";

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
      console.log("User not found")
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await hashPassword(password);


    // Update the user's password and clear the reset password token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    console.log("Password reset successfully")
    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
