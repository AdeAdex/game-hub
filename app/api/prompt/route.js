import { connectToDb } from "../../utils/database";
import User from "../../models/user";
import comparePassword from "../../utils/bcrypt";

export const POST = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    await connectToDb();
    // const loginDetails = await request.body.json();
    // console.log(loginDetails);

    const user = await User.findOne({
      $or: [{ email }, { userName: email }],
    });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export { handler as GET, handler as POST };