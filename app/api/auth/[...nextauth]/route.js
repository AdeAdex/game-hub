// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import { connectToDb } from "../../../utils/database";
import { comparePassword } from "../../../utils/bcrypt";
import { generateToken } from "../../../utils/jwtUtils";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // CredentialsProvider({
    //   async authorize(credentials) {
    //     const { email, password } = credentials;
    
    //     try {
    //       await connectToDb();
    //       // Find user by email or username
    //       const user = await User.findOne({
    //         $or: [{ email }, { userName: email }],
    //       });
    
    //       if (!user) {
    //         throw new Error("Invalid email or password");
    //       }
    
    //       // Compare hashed password
    //       const isValidPassword = await comparePassword(password, user.password);
    //       if (!isValidPassword) {
    //         throw new Error("Invalid email or password");
    //       }
    
    //       // Generate JWT token
    //       const token = generateToken({ email: user.email });
    
    //       // Set loginToken cookie
    //       cookies.set("loginToken", token, {
    //         httpOnly: true,
    //         maxAge: 60 * 60 * 24,
    //         path: "/",
    //         sameSite: "strict",
    //       });
    
    //       // Clear password field before returning user data
    //       user.password = undefined;
    
    //       // Return user data along with token
    //       return { ...user.toJSON(), token, message: "Login successful" };
    //     } catch (error) {
    //       console.error("Error during login:", error);
    //       throw new Error("Error during login");
    //     }
    //   },
    // }),
    

  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDb();
        const userExists = await User.findOne({ email: profile.email });
    
        if (!userExists) {    
          const nameParts = profile.name.split(" ");
          const firstName = nameParts.slice(1).join(" ");
          const lastName = nameParts[0];
    
          let image;
          let userNames;
          if (profile.avatar_url) {
            image = profile.avatar_url;
            userNames = profile.login;
          } else {
            image = profile.picture;
            userNames = profile.email;
          }

          const userObject = {
            email: profile.email,
            firstName: firstName,
            lastName: lastName,
            userName: userNames,
            profilePicture: image // Include profilePicture field
          };
    
          // Use Mongoose's 'strict: false' option to allow dynamic fields
          const user = new User(userObject);
          await user.save();
        }
        return true;
      } catch (error) {
        console.error("Error occurred during signIn:", error);
        return false;
      }
    },
    
  },
});

export { handler as GET, handler as POST };
