// /api/posts/hide/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const PUT = async (req, res) => {
  try {
    const postId = req.query.postId;

    await connectToDb();

    // Implement logic to hide the post with the given postId
    // For example, update a field in the post document to indicate it's hidden
    await Post.findByIdAndUpdate(postId, { hidden: true });

    return NextResponse.json({ success: true, message: "Post hidden successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error hiding post:", error.message);
    return NextResponse.error(new Error("Failed to hide post"), {
      status: 500,
    });
  }
};

