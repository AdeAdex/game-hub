// /models/contributor.ts

import mongoose, { Schema, Document } from "mongoose";

export interface Contributor extends Document {
  name: string;
  description: string;
  joinedAt: Date;
}

const contributorSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  joinedAt: { type: Date, required: true },
});

export default mongoose.models.Contributor || mongoose.model<Contributor>("Contributor", contributorSchema);
