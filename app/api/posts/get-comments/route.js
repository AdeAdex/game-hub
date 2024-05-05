// app/api/posts/comments/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const POST = async (req, res) => {
  // if (req.method !== 'GET') {
  //   return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  // }

  try {
    // Extract postId from query parameters
    const { postId } = await req.json();
    console.log(postId);

    // Ensure postId is provided
    if (!postId) {
      return NextResponse.json(
        { message: "PostId is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    // Find the post by postId
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Return the comments of the post
    const comments = post.comments;
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
};
