// app/api/prompt/upload/route.js
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});

export const POST = async (req, res) => {
  try {
    const { newImage, email } = await req.json();
    const profilePicture = await cloudinary.uploader.upload(newImage);

    const cloudLinkForProfilePicture = profilePicture.secure_url;

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { profilePicture: cloudLinkForProfilePicture } },
      { new: true }
    );

    return NextResponse.json(cloudLinkForProfilePicture);
  } catch (err) {
    console.error(err);
   return NextResponse.error(new Error("Internal Server Error"));
  }
};

export const GET = async (request, response) => {
  // Implement GET method logic here if needed
};
