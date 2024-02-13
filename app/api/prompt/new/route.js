// app/api/prompt/new/route.js

import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { hashPassword } from "../../../utils/bcrypt";
import { sendWelcomeEmail } from "../../../utils/emailUtils";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const { prompt } = await req.json();
  try {
    await connectToDb();
    const existingUser = await User.findOne({ email: prompt.email });

    if (existingUser) {
      console.log("Email already exists");
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(prompt.password);
    console.log("Hashed Password:", hashedPassword);

    const newUser = await User.create({
      firstName: prompt.firstName,
      lastName: prompt.lastName,
      userName: prompt.userName,
      email: prompt.email,
      password: hashedPassword,
    });

    try {
      await sendWelcomeEmail(prompt.email, prompt.firstName);
      console.log("Welcome email sent successfully.");
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }

    return NextResponse.json({newUser, message: "Account created successfully. Please check your email.", status: 201});
  } catch (error) {
    console.error("Error creating user:", error.message);
    return NextResponse.json({ message: "Failed to create a new user" }, { status: 500 });
  }

};
