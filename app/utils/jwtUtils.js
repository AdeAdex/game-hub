// app/utils/jwtUtils.js


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



export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.log("jwt error message", error.message)
    // return null; // Token verification failed
  }
};


// export const compareToken = (token, payload) => {
//   try {
//     const decodedPayload = jwt.verify(token, secretKey);
//     return JSON.stringify(decodedPayload) === JSON.stringify(payload);
//   } catch (error) {
//     console.error("Error comparing token:", error);
//     return false;
//   }
// };