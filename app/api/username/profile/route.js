// /app/api/username/profile

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { username } = body;

    await connectToDb();
    const existingUser = await User.findOne({ userName: username });

    if (existingUser) {
        existingUser.password = undefined;
        console.log(existingUser);
      return NextResponse.json(existingUser);
    } else {
        console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
};
