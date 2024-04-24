// /api/posts/delete/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const DELETE = async (req, res) => {
  try {
    const postId = req.query.postId;

    await connectToDb();

    // Implement logic to delete the post with the given postId
    await Post.findByIdAndDelete(postId);

    return NextResponse.json({ success: true, message: "Post deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return NextResponse.error(new Error("Failed to delete post"), {
      status: 500,
    });
  }
};
