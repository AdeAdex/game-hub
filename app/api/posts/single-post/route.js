import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const POST = async (req, res) => {
  try {
    // Extract postId from the request URL parameters
    const { postId } = await req.json();
    console.log(postId)

    await connectToDb();

    // Find the post by postId
    const post = await Post.findById(postId)
      .populate("userId", "profilePicture firstName lastName")
      .populate({
        path: "likedBy",
        select: "-socialId -password", // Exclude socialId and password
      });

    // Check if the post exists
    if (!post) {
      return NextResponse.error(new Error("Post not found"), {
        status: 404,
      });
    }

    // Return the post object
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return NextResponse.error(new Error("Failed to fetch post"), {
      status: 500,
    });
  }
};
