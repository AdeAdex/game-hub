// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import { connectToDb } from "../../../utils/database";
import { comparePassword } from "../../../utils/bcrypt";
import { generateToken } from "../../../utils/jwtUtils";
import { cookies } from "next/headers";


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
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        try {
          await connectToDb();
          const { email, password } = credentials;
          console.log(email);
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await comparePassword(password, user.password);

          if (!passwordMatch) {
            throw new Error("Invalid email or password");
          }

          // Include all user information you need in the returned object
          const token = generateToken({ email: user.email });
          // Set token as a cookie
          
          cookies().set("authToken", token, {
            httpOnly: true, // Ensures the cookie is not accessible by client-side JavaScript
            maxAge: 60 * 60 * 24, // Expires after 24 hours (adjust as needed)
            path: "/", // Cookie is accessible from all paths on the domain
            sameSite: 'strict',
            // Add other options if needed (e.g., secure: true if using HTTPS)
          });

          return { email: user.email, token, ...user.toObject() };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectToDb();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.firstName = sessionUser.firstName;
          session.user.lastName = sessionUser.lastName;
          session.user.userName = sessionUser.userName;
          session.user.profilePicture = sessionUser.profilePicture;
        }

        return session;
      } catch (error) {
        console.error("Error retrieving user details:", error);
        return session;
      }
    },
    async signIn({ profile, credentials }) {
      try {
        await connectToDb();

        if (credentials) {
          // Credentials provider

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await comparePassword(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid email or password");
          }

          return true;
        } else if (profile) {
          // Google or Github provider

          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            const nameParts = profile.name.split(" ");
            const firstName = nameParts.slice(1).join(" ");
            const lastName = nameParts[0];
            const profilePicture = profile.avatar_url || profile.picture;
            const userName = profile.login || profile.email;

            const newUser = new User({
              email: profile.email,
              firstName,
              lastName,
              userName: userName,
              profilePicture: profilePicture,
            });

            await newUser.save();
          }

          return true;
        }
      } catch (error) {
        console.error("Error occurred during signIn:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
