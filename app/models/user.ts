import mongoose from "mongoose";

// Define the schemas
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  from: {type: String,},
});

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
});

// Define the loginData schema
const loginDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  count: { type: Number, required: true, default: 0 },
});

// Define the user schema
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
    friendRequestCount: { type: Number, default: 0 },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    reportedPosts: [
      {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        reason: String,
      },
    ],
    loginData: [loginDataSchema],
    apiKey: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    role: { type: String }, 
    status: { type: String },
    requestCount: { type: Number, default: 0 },
    country: { type: String }, 
    state: { type: String },  
    appName: { type: String },
    messages: [messageSchema], // Embed messages
    payments: [paymentSchema], // Embed payments
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
