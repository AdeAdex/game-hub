// /api/developer/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import User from "../../models/user";
import crypto from "crypto";


export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('user');
    
    console.log(userEmail)
    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    await connectToDb();

    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ apiKey: user.apiKey }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API key:", error.message);
    return NextResponse.error(new Error("Failed to fetch API key"), {
      status: 500,
    });
  }
};




export const POST = async (req) => {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDb();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const apiKey = crypto.randomBytes(20).toString('hex');
    user.apiKey = apiKey;
    await user.save();

    return NextResponse.json({ apiKey }, { status: 200 });
  } catch (error) {
    console.error("Error generating API key:", error.message);
    return NextResponse.error(new Error("Failed to generate API key"), {
      status: 500,
    });
  }
};

