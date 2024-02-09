import { connectToDb } from "../../utils/database";
import User from "../../models/user";

export const POST = async (request) => {
  const loginDetails = await req.json();
  console.log(loginDetails);

  try {
    await connectToDb();
    const user = await User.findOne({
      $or: [{ email: loginDetails.email }, { userName: loginDetails.email }],
    });

    if (user) {
      console.log("User found:", user);
      // Return a JSON response with user data
      return new Response(JSON.stringify(user), { status: 200, headers: { "Content-Type": "application/json" } });
    } else {
      console.log("User not found");
      // Return a JSON response with error message
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }
  } catch (error) {
    console.log(error);
    // Return a JSON response with internal server error message
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
