// app/api/track-visit/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import Visitor from "../../models/visitors.js";

export const POST = async (req, res) => {
  try {
    const { postId, userId, reactionType } = await req.json();
    await connectToDb();
    const newVisitors = await Visitor.create({ postId, userId, reactionType });
    return NextResponse.json(newReaction, { status: 201 });
  } catch (error) {
    console.error("Error creating reaction:", error.message);
    return NextResponse.error(new Error("Failed to create reaction"), {
      status: 500,
    });
  }
};

export const GET = async (request, response) => {
  // Implement GET method logic here if needed
};
