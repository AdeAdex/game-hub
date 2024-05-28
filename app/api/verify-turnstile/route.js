// app/api/verify-turnstile/route.js
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { token } = await req.json();
    const secretKey = process.env.CLOUDFLARE_SECRET_KEY; // Store your secret key in .env file

    const verifyURL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    const response = await fetch(verifyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, 'error-codes': data['error-codes'] }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying Turnstile:", error.message);
    return NextResponse.error(new Error("Failed to verify Turnstile"), { status: 500 });
  }
};
