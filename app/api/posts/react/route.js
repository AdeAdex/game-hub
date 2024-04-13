// /api/posts/react/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const POST = async (req) => {
  try {
    const { postId, action } = await req.json();
    await connectToDb();
    let updatedPost;

    switch (action) {
      case "like":
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: 1 }, $addToSet: { likedBy: req.user._id } }, // Add user ID to likedBy array
          { new: true }
        );
        break;
      case "unlike":
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: -1 }, $pull: { likedBy: req.user._id } }, // Remove user ID from likedBy array
          { new: true }
        );
        break;
      case "dislike":
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { dislikes: 1 } },
          { new: true }
        );
        break;
      default:
        throw new Error("Invalid action");
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error.message);
    return NextResponse.error(new Error("Failed to update post"), {
      status: 500,
    });
  }
};
