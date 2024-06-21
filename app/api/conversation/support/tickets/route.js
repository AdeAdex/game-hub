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

    return NextResponse.json(
      { success: true, message: "Support Ticket sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending support ticket:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to submit support ticket. Please try again." },
      { status: 500 }
    );
  }
};
