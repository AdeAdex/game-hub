// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "../../../models/user";
import { connectToDb } from "../../../utils/database";


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
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      });
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
  
    async signIn ({profile}) {
      try {
        await connectToDb();
        const userExists = await User.findOne({email: profile.email})

        if (!userExists) {
         await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture
         })
        }
  
      } catch (error) {
        console.error("Error occurred during signIn:", error);
      }
    }
  }
  
});

export {handler as GET, handler as POST}
