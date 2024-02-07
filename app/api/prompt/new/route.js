// app/api/prompt/new/route.js

import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req) => {
  const { prompt } = await req.json();

  try {
    await connectToDb();
    const newUser = new User(prompt);
    await newUser.save();

    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return new Response("Failed to create a new user", { status: 500 });
  }
};



