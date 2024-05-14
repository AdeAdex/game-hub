// /api/posts/save/[postId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req, res) => {
  try {
    const { userId, postId } = await req.json();

    await connectToDb();

    // Check if the post is already saved by the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.error(new Error("User not found"), { status: 404 });
    }

    if (user.savedPosts.includes(postId)) {
      return NextResponse.json(
        { success: false, message: "Post already saved." },
        { status: 400 }
      );
    }

    // If not already saved, save the post for the user
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
