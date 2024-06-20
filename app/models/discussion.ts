// /models/discussion.ts
import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Discussion = mongoose.models.Discussion || mongoose.model("Discussion", DiscussionSchema);

export default Discussion;
