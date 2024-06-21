//   /api/conversation/community/discussions.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Discussion from "../../../models/discussion";

export const POST = async (req, res) => {
  try {
    const { title, content } = await req.json();

    await connectToDb();

    const newDiscussion = new Discussion({
      title,
      content,
      createdAt: new Date(),
    });

    await newDiscussion.save();

    console.log('saved');
    return NextResponse.json(
      { success: true, message: "Discussion posted successfully.", newDiscussion },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error posting discussion:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to post discussion" },
      { status: 500 }
    );
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDb();

    const discussions = await Discussion.find().sort({ createdAt: -1 }).limit(3);

    return NextResponse.json(discussions, { status: 200 });
  } catch (error) {
    console.error("Error fetching discussions:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch discussions" },
      { status: 500 }
    );
  }
};
