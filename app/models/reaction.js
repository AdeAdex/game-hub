// models/reaction.js
import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reactionType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Reaction = mongoose.models?.Reaction || mongoose.model("Reaction", reactionSchema);
export default Reaction;
