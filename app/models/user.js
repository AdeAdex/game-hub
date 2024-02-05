import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
});

export const UserModel = mongoose.models?.User || mongoose.model("User", userSchema);

