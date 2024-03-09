// app/api/logout/route.js

import { cookies } from "next/headers";
// app/api/logout/route.js
import { NextResponse } from "next/server";

export default async function logoutHandler(req, res) {
  try {
    cookies().set("loginToken", "", {
      expires: new Date(0), // Set expiration date to a past time to clear the cookie
      path: "/", // Specify the path of the cookie
      sameSite: "strict", // Specify the SameSite attribute of the cookie
    });

    // Return a response indicating successful logout
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Error logging out:", error);
    // Handle any errors that occur during logout
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Export the named function for the POST method
export { logoutHandler as POST };
