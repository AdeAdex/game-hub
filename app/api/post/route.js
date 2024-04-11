// /api/posts/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import Post from "../../models/post";

export const POST = async (req) => {
  try {
      const { content, userId } = await req.json();
          await connectToDb();
              const newPost = await Post.create({ content, userId });
                  return NextResponse.json(newPost, { status: 201 });
                    } catch (error) {
                        console.error("Error creating post:", error.message);
                            return NextResponse.error(new Error("Failed to create post"), { status: 500 });
                              }
                              };

                             
export const GET = async (request, response) => {
      // Implement GET method logic here if needed
      };
