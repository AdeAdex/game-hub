  // /api/posts/react/route.ts
  import { NextResponse } from "next/server";
  import { connectToDb } from "../../../utils/database";
  import Post from "../../../models/post";
  
  export const POST = async (req) => {
    try {
      const { postId, action, userId } = await req.json();
      console.log(postId, action, userId);
      await connectToDb();
      let updatedPost;
  
      switch (action) {
        case "like":
          updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: 1 }, $addToSet: { likedBy: userId } }, // Add user ID to likedBy array
            { new: true }
          );
          break;
        case "unlike":
          // Check if the user has previously liked the post before unliking
          const post = await Post.findById(postId);
          if (post && post.likedBy.includes(userId)) {
            updatedPost = await Post.findByIdAndUpdate(
              postId,
              { $inc: { likes: -1 }, $pull: { likedBy: userId } }, // Remove user ID from likedBy array
              { new: true }
            );
          } else {
            console.error("User has not previously liked the post");
          }
          break;
        case "dislike":
          updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { dislikes: 1 } },
            { new: true }
          );
          break;
        default:
          throw new Error("Invalid action");
      }
  
      if (updatedPost) {
        return NextResponse.json(updatedPost, { status: 200 });
      } else {
        return NextResponse.error(new Error("Failed to update post"), {
          status: 500,
        });
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
      return NextResponse.error(new Error("Failed to update post"), {
        status: 500,
      });
    }
  };
  