// app/api/admin/visitors/route.js

import { NextResponse } from 'next/server';
import { connectToDb } from '../../../utils/database';
import Visitor from '../../../models/visitors';

export const GET = async () => {
  try {
    await connectToDb();
    const visitors = await Visitor.find().sort({ date: -1 }); // Fetch all visitors sorted by date
    return NextResponse.json(visitors, { status: 200 });
  } catch (error) {
    console.error("Error fetching visitors:", error.message);
    return NextResponse.error(new Error("Failed to fetch visitors"), { status: 500 });
  }
};
