// app/api/prompt/new/route.js

import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { hashPassword } from "../../../utils/bcrypt";
import { sendWelcomeEmail } from "../../../utils/emailUtils";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const { prompt } = await req.json();
  // console.log(prompt)
  try {
    await connectToDb();

    const existingUserWithEmail = await User.findOne({ email: prompt.email });
    const existingUserWithUsername = await User.findOne({ userName: prompt.userName });

    if (existingUserWithEmail) {
      console.log("Email already exists");
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    if (existingUserWithUsername) {
      console.log("Username already exists");
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
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

    const logoUrl = process.env.ADEX_GAMEHUB_LOGO; // Your logo URL
    const welcomeMessage = welcomeMessageTemplate(prompt.firstName, logoUrl);

    // Create a message to be added to the new user's messages array
    const welcomeMessageObject = {
      sender: "Adex GameHub", // This should ideally be an ObjectId if referencing a User
      receiver: newUser._id, // The ID of the newly created user
      content: welcomeMessage,
      timestamp: new Date(),
    };

    // Add the message to the new user's messages
    await User.findByIdAndUpdate(
      newUser._id,
      { $push: { messages: welcomeMessageObject } },
      { new: true }
    );

    try {
      await sendWelcomeEmail(prompt.email, prompt.firstName);
      console.log("Welcome email sent successfully.");
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }

    return NextResponse.json({ message: "Account created successfully. Please check your email.", status: 201});
  } catch (error) {
    console.error("Error creating user:", error.message);
    return NextResponse.json({ message: "Failed to create a new user" }, { status: 500 });
  }

};
