// app/api/dashboard/route.ts

import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../utils/database";
import User from "../../../models/user";
import { verifyToken } from "../../../utils/jwtUtils.js";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  export const GET = async (req, res) => {
  try {
    const authorizationHeader = req.headers.get("authorization");

    if (!authorizationHeader) {
      return NextResponse.json({
        success: false,
        error: "Authorization header missing",
      });
    }

    const token = authorizationHeader.split("Bearer ")[1];
    // const url = new URL(req.url || "", "http://localhost"); 
    // const token = url.searchParams.get("token");

    console.log("token", token);

    if (!token) {
      return NextResponse.json({
        success: false,
        error: "Invalid token format",
      });
    }

    const decodedToken = await verifyToken(token);
    // console.log(decodedToken);

    if (!decodedToken) {
      return NextResponse.json({ success: false, error: "Invalid token" });
    }

    await connectToDb(); // Connect to the database
    const user = await User.findOne({ email: decodedToken.email }).select(
      "-password"
    ); // Remove the password from what will be sent

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    // User found, return success response with user data
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
};









// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDb } from "../../../utils/database";
// import User from "../../../models/user";
// import { verifyToken } from "../../../utils/jwtUtils.js";

// export const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const url = new URL(req.url || "", "http://localhost");
//     const token = url.searchParams.get("token");

//     if (!token) {
//       return res.status(400).json({ success: false, error: "Invalid token format" });
//     }

//     const decodedToken = await verifyToken(token);

//     if (!decodedToken) {
//       return res.status(401).json({ success: false, error: "Invalid token" });
//     }

//     await connectToDb();
//     const user = await User.findOne({ email: decodedToken.email }).select(
//       "-password"
//     );

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     return res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Error handling GET request:", error);
//     return res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// }

// export const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // POST request handling logic
// };

// export const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // PUT request handling logic
// };

// export const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // DELETE request handling logic
// };

// export const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // PATCH request handling logic
// };

// export const headHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // HEAD request handling logic
// };

// export const optionsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // OPTIONS request handling logic
// };
