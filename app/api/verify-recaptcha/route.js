// app/api/verify-recaptcha/route.js

import { NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req) => {
  try {
    const { token } = await req.json();
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.log("Missing reCAPTCHA secret key.");
      throw new Error("Missing reCAPTCHA secret key.");
    }

    const verifyURL = 'https://www.google.com/recaptcha/api/siteverify';

    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);

    const response = await axios.post(verifyURL, params);

    console.log("response data", response.data);
    const data = response.data;

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, 'error-codes': data['error-codes'] }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error.message);
    return NextResponse.json({ error: "Failed to verify reCAPTCHA" }, { status: 500 });
  }
};
