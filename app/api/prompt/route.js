import { connectToDb } from "../../utils/database";
import User from "../../models/user";
import comparePassword from "../../utils/bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request, res) => {
  const { email, password } = request.body;
  console.log(request.body);
  try {
    await connectToDb();
    const user = await User.findOne({
      $or: [{ email }, { userName: email }],
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({}, { status: 404 });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("User found:", user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (request, response) => {
  // Implement GET method logic here if needed
};
