import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import User from "../../models/user";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});

export const POST = async (req) => {
  try {
    const {
      email,
      firstName,
      lastName,
      userName,
      profilePicture,
      password,
      userEmail,
      facebook,
      linkedin,
      twitter,
      role, // Add role field
      status, // Add status field
    } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDb();

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the new email or username is already taken by another user
    if (email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return NextResponse.json(
          { error: "Email is already taken" },
          { status: 400 }
        );
      }
    }

    if (userName && userName !== user.userName) {
      const userNameExists = await User.findOne({ userName });
      if (userNameExists) {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 400 }
        );
      }
    }

    // Update user information
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) user.userName = userName;
    if (facebook) user.facebook = facebook;
    if (linkedin) user.linkedin = linkedin;
    if (twitter) user.twitter = twitter;
    if (role) user.role = role; // Update role
    if (status) user.status = status; // Update status

    // Handle profile picture upload to Cloudinary
    if (profilePicture) {
      const uploadedImage = await cloudinary.uploader.upload(profilePicture);
      user.profilePicture = uploadedImage.secure_url;
    }

    // Check if the new password is the same as the current password
    if (password) {
      const isSamePassword = await comparePassword(password, user.password);
      if (isSamePassword) {
        return NextResponse.json(
          { error: "New password cannot be the same as the current password" },
          { status: 400 }
        );
      }
      user.password = await hashPassword(password);
    }

    await user.save();

    return NextResponse.json(
      { message: "User information updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user information:", error.message);
    return NextResponse.json(
      { error: "Failed to update user information" },
      { status: 500 }
    );
  }
};
