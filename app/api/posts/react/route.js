// /api/posts/react/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const POST = async (req) => {
  try {
    const { postId, action, userId } = await req.json();
    console.log(postId, action, userId);

    await connectToDb();
    let updatedPost;

    switch (action) {
      case "like":
        // Use findOneAndUpdate to return the updated document with populated userId field
        updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $inc: { likes: 1 }, $addToSet: { likedBy: userId } },
          { new: true }
        ).populate("userId");
        break;
      case "unlike":
        // Use findOneAndUpdate to return the updated document with populated userId field
        updatedPost = await Post.findOneAndUpdate(
          { _id: postId, likedBy: userId },
          { $inc: { likes: -1 }, $pull: { likedBy: userId } },
          { new: true }
        ).populate("userId");
        if (!updatedPost) {
          throw new Error("User has not previously liked the post");
        }
        break;
      case "dislike":
        // Use findOneAndUpdate to return the updated document with populated userId field
        updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $inc: { dislikes: 1 } },
          { new: true }
        ).populate("userId");
        break;
      default:
        throw new Error("Invalid action");
    }

    if (updatedPost) {
      return NextResponse.json(updatedPost, { status: 200 });
    } else {
      return NextResponse.error(new Error("Failed to update post"), {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    return NextResponse.error(new Error("Failed to update post"), {
      status: 500,
    });
  }
};
