// /api/conversation/support/tickets/route.ts

import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import SupportTicket from "@/app/models/supportTicket";

export const POST = async (req) => {
  try {
    const { title, description } = await req.json();
    console.log(title, description)

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and Description are required." },
        { status: 400 }
      );
    }

    await connectToDb();

    const newSupportTicket = new SupportTicket({
      title,
      description,
    });

    await newSupportTicket.save();

    await sendSupportEmail(title, description);

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
