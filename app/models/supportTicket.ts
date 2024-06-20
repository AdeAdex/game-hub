// /models/supportTicket.js

import mongoose from 'mongoose';

const SupportTicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SupportTicket = mongoose.models.SupportTicket || mongoose.model('SupportTicket', SupportTicketSchema);

export default SupportTicket;
