// /api/posts/save/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req, res) => {
  try {
    const { userId, postId } = await req.json();

    await connectToDb();

    // Implement logic to save the post for the user
    await User.findByIdAndUpdate(userId, { $addToSet: { savedPosts: postId } });

    return NextResponse.json(
      { success: true, message: "Post saved successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving post:", error.message);
    return NextResponse.error(new Error("Failed to save post"), {
      status: 500,
    });
  }
};
