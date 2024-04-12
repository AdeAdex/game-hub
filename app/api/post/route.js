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
  try {
    await connectToDb();
    const posts = await Post.find().sort({ timestamp: -1 }).populate('userId', 'profilePicture firstName lastName');
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.error(new Error("Failed to fetch posts"), { status: 500 });
  }
};



export const PUT = async (req) => {
  try {
    const { postId, action } = await req.json();
    await connectToDb();
    let updatedPost;

    switch (action) {
      case "like":
        updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
        break;
      case "dislike":
        updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { dislikes: 1 } }, { new: true });
        break;
      case "comment":
        const { comment } = await req.json();
        updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true });
        break;
      default:
        throw new Error("Invalid action");
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error.message);
    return NextResponse.error(new Error("Failed to update post"), { status: 500 });
  }
};
