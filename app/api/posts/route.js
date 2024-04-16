// /api/posts/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import Post from "../../models/post";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});

export const POST = async (req) => {
  try {
    const { content, userId, image } = await req.json();

    let imageData;

    if (image) {
      const postPicture = await cloudinary.uploader.upload(image);
      imageData = postPicture.secure_url;
    }

    await connectToDb();

    const newPost = await Post.create({
      content: content || "",
      userId,
      image: imageData,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error.message);
    return NextResponse.error(new Error("Failed to create post"), {
      status: 500,
    });
  }
};

export const GET = async (req, res) => {
  try {
        await connectToDb();
    const posts = await Post.find()
      .sort({ timestamp: -1 })
      .populate("userId", "profilePicture firstName lastName")
      .populate("likedBy"); // Populate the likedBy array
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.error(new Error("Failed to fetch posts"), {
      status: 500,
    });
  }
};
