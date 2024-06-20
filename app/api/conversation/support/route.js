// /pages/api/support/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import SupportTicket from "../../../models/supportTicket";
import { sendSupportEmail } from "../../../utils/emailUtils";

export const POST = async (req) => {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await connectToDb();

    const newSupportTicket = new SupportTicket({
      name,
      email,
      message,
    });

    await newSupportTicket.save();

    await sendSupportEmail(name, email, message);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending support email:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
};
