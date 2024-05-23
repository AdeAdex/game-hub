// app/api/track-visit/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "../../utils/database";
import Visitor from "../../models/visitors.js";

export const POST = async (req) => {
  try {
    const { referrer, utmSource, utmMedium, utmCampaign, url, userAgent } = await req.json();
    
    await connectToDb();

    const ipAddress = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

    const visitorData = {
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      url,
      userAgent,
      ipAddress,
    };

    const newVisitor = new Visitor(visitorData);
    await newVisitor.save();

    console.log("visitor", newVisitor)
    return NextResponse.json(newVisitor, { status: 201 });
  } catch (error) {
    console.error("Error tracking visit:", error.message);
    return NextResponse.error(new Error("Failed to track visit"), { status: 500 });
  }
};
