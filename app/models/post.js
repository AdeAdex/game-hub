// /app/models/post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String }, // Add a field to store the base64 string of the image
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New field to store user IDs who liked the post
    comments: [{ type: String }],
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export default Post;

