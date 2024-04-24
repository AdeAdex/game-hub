// /api/posts/edit/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Post from "../../../models/post";

export const PUT = async (req, res) => {
  try {
    const body = await req.json();
    const { postId, content, image} = body; 

    await connectToDb();

   // Check if the post exists
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found."}, { status: 200 });
    } 

    // Implement logic to update the content of the post with the given postId
    await Post.findByIdAndUpdate(postId, { content });

    return NextResponse.json({ success: true, message: "Post edited successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error editing post:", error.message);
    return NextResponse.error(new Error("Failed to edit post"), {
      status: 500,
    });
  }
};
