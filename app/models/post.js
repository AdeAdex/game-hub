// /app/models/post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String }, // Add a field to store the base64 string of the image
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New field to store user IDs who liked the post
    comments: [
      {
        content: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    timestamp: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false }, // Add a field to indicate if the post is hidden
    reportedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: String,
      },
    ], // Array to store user IDs who reported the post and reasons
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export default Post;
