// /app/models/post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [{ type: String }],
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export default Post;
