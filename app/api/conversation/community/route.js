// /api/conversation/community/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Discussion from "../../../models/discussion";

export const POST = async (req, res) => {
  try {
    const { title, content } = await req.json();
    console.log(title, content)

    await connectToDb();

    const newDiscussion = new Discussion({
      title,
      content,
      createdAt: new Date(),
    });

    await newDiscussion.save();

    console.log('saved')
    return NextResponse.json(
      { success: true, message: "Discussion posted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error posting discussion:", error.message);
    return NextResponse.error(new Error("Failed to post discussion"), {
      status: 500,
    });
  }
};


