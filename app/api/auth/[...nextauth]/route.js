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
        return handleAuthentication(credentials);
        
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
        return handleAuthentication(credentials, profile);
      } catch (error) {
        console.error("Error occurred during signIn:", error);
        return false;
      }
      
    },
  },
});



async function handleAuthentication(credentials, profile) {
  try {
    await connectToDb();

    if (credentials) {
      const { email, password } = credentials;
      const user = await User.findOne({
        $or: [{ email: email }, { userName: email }],
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken({ email: user.email });
      cookies().set("authToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "strict",
      });

      return { email: user.email, token, ...user.toObject() };
    } else if (profile) {
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const nameParts = profile.name.split(" ");
        const firstName = nameParts.slice(1).join(" ");
        const lastName = nameParts[0];
        const profilePicture = profile.avatar_url || profile.picture;
        const userName = profile.login ? profile.login : lastName;
        const socialId = profile.id

        
        const newUser = new User({
          email: profile.email,
          firstName,
          lastName,
          userName: userName,
          profilePicture: profilePicture,
          socialId
        });

        await newUser.save();
      }

      const token = generateToken({ email: profile.email });
      cookies().set("authToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "strict",
      });

      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export { handler as GET, handler as POST };
