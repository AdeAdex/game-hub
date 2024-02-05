import { UserModel } from "../models/user";
import { connectToDb } from "../utils/database";

export const RegisterUser = async (userData) => {
  try {
    await connectToDb();
    const newUser = await UserModel.create(userData);
    console.log("User created successfully:", newUser);
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};
