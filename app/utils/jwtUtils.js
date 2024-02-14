import jwt from "jsonwebtoken";
// import crypto from "crypto";

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_DURATION

export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
