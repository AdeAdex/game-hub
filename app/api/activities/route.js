// pages/api/reactions/index.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Reaction from "../../../models/reaction";

export const POST = async (req) => {
  try {
      const { postId, userId, reactionType } = await req.json();
          await connectToDb();
              const newReaction = await Reaction.create({ postId, userId, reactionType });
                  return NextResponse.json(newReaction, { status: 201 });
                    } catch (error) {
                        console.error("Error creating reaction:", error.message);
                            return NextResponse.error(new Error("Failed to create reaction"), { status: 500 });
                              }
                              };
                              