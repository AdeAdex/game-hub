// /api/posts/edit/route.js
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});

export const PUT = async (req, res) => {
  try {
    const body = await req.json();
    const { postId, content, image} = body; 

    await connectToDb();

   // Check if the post exists
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found."}, { status: 200 });
    } 

    let imageData;

    if (image) {
      const postPicture = await cloudinary.uploader.upload(image);
      imageData = postPicture.secure_url;
    }

    // Implement logic to update the content of the post with the given postId
    await Post.findByIdAndUpdate(postId, { content });

    return NextResponse.json({ success: true, message: "Post edited successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error editing post:", error.message);
    return NextResponse.error(new Error("Failed to edit post"), {
      status: 500,
    });
  }
};
