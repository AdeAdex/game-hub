// app/models/visitors.js

import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  referrer: { type: String },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  url: { type: String, required: true },
  userAgent: { type: String, required: true },
  ipAddress: { type: String },
  date: { type: Date, default: Date.now },
});

const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);

export default Visitor;