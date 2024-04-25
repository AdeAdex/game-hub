// /api/posts/report/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const POST = async (req, res) => {
  try {
    const postId = req.query.postId;
    const { userId, reason } = await req.json();

    await connectToDb();

    // Implement logic to report the post
    // For example, add the userId and reason to the post's reportedBy array
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { reportedBy: { userId, reason } },
    });

    return NextResponse.json(
      { success: true, message: "Post reported successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reporting post:", error.message);
    return NextResponse.error(new Error("Failed to report post"), {
      status: 500,
    });
  }
};
