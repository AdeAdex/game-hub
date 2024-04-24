// /api/posts/hide/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const PUT = async (req, res) => {
  try {
    const body = await req.json();
		const postId = body.postId; 


    await connectToDb();

    // Check if the post exists
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found."}, { status: 200 });
    }

    // Implement logic to hide the post with the given postId
    // For example, update a field in the post document to indicate it's hidden
    await Post.findByIdAndUpdate({ _id: postId} , { hidden: true });

    return NextResponse.json({ success: true, message: "Post hidden successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error hiding post:", error.message);
    return NextResponse.error(new Error("Failed to hide post"), {
      status: 500,
    });
  }
};

