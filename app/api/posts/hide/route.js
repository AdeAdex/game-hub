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
      return NextResponse.json({ success: false, message: "Post not found."}, { status: 404 });
    }

    post.hidden = true;
    await post.save();

    return NextResponse.json({ success: true, message: "Post hidden successfully."}, { status: 200 });
  } catch (error) {
    console.error("Error hiding post:", error.message);
    return NextResponse.error(new Error("Failed to hide post"), {
      status: 500,
    });
  }
};

