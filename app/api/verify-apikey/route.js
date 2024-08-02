import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import User from "../../models/user";

export const POST = async (req) => {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    const user = await User.findOne({ apiKey });

    if (!user) {
      return NextResponse.json({ valid: false }, { status: 403 });
    }

    // Increment the request count
    user.requestCount += 1;
    await user.save();

    return NextResponse.json(
      { valid: true, name: `${user.firstName} ${user.lastName}`, requestCount: user.requestCount },
      { status: 200 }
    );    
  } catch (error) {
    console.error("Error verifying API key:", error.message);
    return NextResponse.error(new Error("Failed to verify the API key from GameHub"), {
      status: 500,
    });
  }
};
