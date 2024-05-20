// /app/models/activity

import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ['login', 'password_change', 'profile_update'], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  device: { type: String, required: true }, // Add device field
  location: { type: String, required: true } // Add location field
});

const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export default Activity;
