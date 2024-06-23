// /api/news/route.ts
import { NextResponse } from "next/server";
import axios from 'axios';

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Ensure this is set in your environment variables

export const GET = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=ng&apiKey=${NEWS_API_KEY}`
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return NextResponse.error(new Error("Failed to fetch news"), {
      status: 500,
    });
  }
};
