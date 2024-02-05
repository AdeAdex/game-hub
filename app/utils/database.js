import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Error connecting to database:", error.message);
    throw new Error(error);
  }
};
