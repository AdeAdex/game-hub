//   /api/conversation/community/contributor.ts


import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import Contributor from "../../../models/contributor";

export const POST = async (req, res) => {
  try {
    const { name, description } = await req.json();
    console.log(name, description);

    await connectToDb();

    const newContributor = new Contributor({
      name,
      description,
      joinedAt: new Date(),
    });

    await newContributor.save();

    console.log('saved');
    return NextResponse.json(
      { success: true, message: "Contributor added successfully.", newContributor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding contributor:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to add contributor" },
      { status: 500 }
    );
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDb();

    const contributors = await Contributor.find().sort({ joinedAt: -1 }).limit(10);
    console.log(contributors);

    return NextResponse.json(contributors, { status: 200 });
  } catch (error) {
    console.error("Error fetching contributors:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contributors" },
      { status: 500 }
    );
  }
};
