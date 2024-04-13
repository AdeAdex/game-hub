// /api/posts/react/route.ts

export const POST = async (req) => {
  try {
    const { postId, action } = await req.json();
    await connectToDb();
    let updatedPost;

    switch (action) {
      case "like":
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: 1 }, $addToSet: { likedBy: req.user._id } },
          { new: true }
        );
        break;
      case "unlike":
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: -1 }, $pull: { likedBy: req.user._id } },
          { new: true }
        );
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
