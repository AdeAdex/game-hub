// /api/posts/delete/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const DELETE = async (req, res) => {
  try {
    const body = await req.json();
		const postId = body.postId; 

    await connectToDb();

    // Check if the post exists
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found."}, { status: 200 });
    }

    // Implement logic to delete the post with the given postId
    await Post.findByIdAndDelete({ _id: postId });

    return NextResponse.json({ success: true, message: "Post deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return NextResponse.error(new Error("Failed to delete post"), {
      status: 500,
    });
  }
};
