import { connectToDb } from "../../utils/database";
import User from "../../models/user";
import { comparePassword } from "../../utils/bcrypt";
import { NextResponse } from "next/server";
import { generateToken } from "../../utils/jwtUtils"

export const POST = async (req, res) => {
  const { email, password } = await req.json();
  try {
    await connectToDb();
    const user = await User.findOne({
      $or: [{ email }, { userName: email }],
    });

    if (!user) {
      // console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      // console.log("Invalid email or password");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken({ email: user.email })

    user.password = undefined;


    return NextResponse.json(
      { ...user, token, message: "Login successful" },
      { status: 200 }
    );
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
