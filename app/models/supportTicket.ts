// /models/supportTicket.js

import mongoose from "mongoose";

const SupportTicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SupportTicket =
  mongoose.models.SupportTicket ||
  mongoose.model("Support-ticket", SupportTicketSchema);

export default SupportTicket;
