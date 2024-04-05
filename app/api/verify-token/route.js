// /app/api/verify-token.js

import { NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/jwtUtils";



export const POST = async (req, res) => {
  try {
   
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

      const { token } = await req.json() // Access token from the request body
    console.log(token);
  
      if (!token) {
        return NextResponse.json({ message: "Token is missing" }, { status: 400 });
      }
  
      // Verify the token
      const decodedToken = await verifyToken(token);
  
      if (!decodedToken) {
        return NextResponse.json({ message: "Invalid token or Token has expired" }, { status: 400 });
      }

      // Check if the token has expired
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (decodedToken.exp < currentTime) {
      return NextResponse.json({ message: "Token has expired" }, { status: 400 });
    }
  
      // Token is valid
      return NextResponse.json({ message: "Password reset request successful!" }, { status: 200 });
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };
  
  export const GET = async (request, response) => {
    // This method is not implemented yet, you might want to implement it later
    return NextResponse.error(new Error("Method not implemented"), { status: 501 });
  };