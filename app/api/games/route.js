// app/api/games/route.js

import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req) => {
  try {
    const apiKey = process.env.RAWG_API_KEY;

    if (!apiKey) {
      console.log("Missing RAWG API key.");
      throw new Error("Missing RAWG API key.");
    }

    const apiUrl = 'https://api.rawg.io/api/games';

    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
      },
    });

    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
};
