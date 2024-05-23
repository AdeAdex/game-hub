// app/models/visitors.js

import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  source: { type: String, enum: ['social_media', 'google', 'direct', 'other'], default: 'direct' },
  date: { type: Date, default: Date.now },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
