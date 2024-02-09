import { connectToDb } from "../../utils/database";
import User from "../../models/user";

export const POST = async (req, res) => {
  const loginDetails = await req.json();
  console.log(loginDetails);

  try {
    await connectToDb();
    const user = await User.findOne({
      $or: [{ email: loginDetails.email }, { userName: loginDetails.email }],
    });

    if (user) {
        console.log("User found:", user);
        return { status: 200, body: user }; // Returning user data
      } else {
        console.log("User not found");
        return { status: 404, body: { message: "User not found" } }; // Returning error message
      }
    } catch (error) {
      console.log(error);
      return { status: 500, body: { message: "Internal server error" } }; // Returning error message
    }
};
