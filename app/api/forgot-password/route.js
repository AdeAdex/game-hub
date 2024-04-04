// /app/api/forgot-pasword

import User from "../../models/user";
import { connectToDb } from "../../utils/database";
import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "../../utils/emailUtils";
import { generateToken } from "@/app/utils/jwtUtils";

export const POST = async (req, res) => {
  const { email } = await req.json();
  try {
    await connectToDb();
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset password token using JWT
    const resetTokenPayload = { email: user.email };
    const resetToken = generateToken(resetTokenPayload);

    console.log(resetToken)
    
    // Store reset token in the database, along with user's email and expiration time
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 600000; // Token expiry time (10 minutes)
    await user.save();


    // Generate reset password link here, assuming you have a route for resetting password
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`; // Replace with your actual reset password link


//     const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`; // Assuming you have BASE_URL set in your environment variables

    // Send reset password email
    await sendResetPasswordEmail(email, resetLink);

    return NextResponse.json(
      { message: "Reset password email sent" },
      { status: 200 }
    );
    return NextResponse.json({ message: "User found" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (request, response) => {
  // Implement GET method logic here if needed
};
