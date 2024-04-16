// /api/posts/my-likes/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const POST = async (req, res) => {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.error(new Error("User ID not provided"), {
        status: 400,
      });
    }

    await connectToDb();

    // Fetch all posts and liked posts for the user
    const likedPosts = await Post.find({ likedBy: userId }).populate(
      "userId",
      "profilePicture firstName lastName userName"
    );

    //     console.log("liked", likedPosts)

    return NextResponse.json(likedPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.error(new Error("Failed to fetch posts"), {
      status: 500,
    });
  }
};
