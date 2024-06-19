// // // /app/api/username/profile

// import { NextResponse } from "next/server";
// import { connectToDb } from "../../../utils/database";
// import User from "../../../models/user";

// export const POST = async (req) => {
//   try {
//     const body = await req.json();
//     const { username } = body;

//     await connectToDb();
//     const existingUser = await User.findOne({ userName: username });

//     if (existingUser) {
//         existingUser.password = undefined;
//         console.log(existingUser);
//       return NextResponse.json(existingUser);
//     } else {
//         console.log("User not found");
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error handling request:", error.message);
//     return NextResponse.error(new Error("Internal Server Error"));
//   }
// };




import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { verifyToken } from "../../../utils/jwtUtils.js";

export const POST = async (req) => {
  try {
    // Get the session token from cookies
    const sessionToken = req.cookies.get("authToken");

    if (!sessionToken) {
      console.log("Session token not found");
      return NextResponse.json({
        success: false,
        error: "Session token not found",
      });
    }

    const token = sessionToken.value;

    // Verify the session token
    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      console.log("Invalid session token");
      return NextResponse.json({
        success: false,
        error: "Invalid session token",
      });
    }

    // Check if the session token is expired
    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      console.log("Session token has expired");
      return NextResponse.json({
        success: false,
        error: "Session token has expired",
      });
    }

    const body = await req.json();
    const { username } = body;

    // Ensure the username from the request matches the username in the token
    if (username !== decodedToken.username) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({
        success: false,
        error: "Unauthorized access",
      });
    }

    await connectToDb();
    const existingUser = await User.findOne({ userName: username });

    if (existingUser) {
      existingUser.password = undefined; // Ensure the password is not returned
      console.log(existingUser);
      return NextResponse.json({ success: true, user: existingUser });
    } else {
      console.log("User not found");
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error handling request:", error.message);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
