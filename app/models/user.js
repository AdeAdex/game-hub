// /app/models/user.js
import mongoose from "mongoose";

const loginDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  count: { type: Number, required: true, default: 1 },
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    socialId: { type: String, default: "" },
    profilePicture: { type: String },
    resetPasswordToken: { type: String },
    currentFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    incomingFriendRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    outgoingFriendRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    reportedPosts: [
      {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        reason: String,
      },
    ],
    loginData: [loginDataSchema], // Add loginData field
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
