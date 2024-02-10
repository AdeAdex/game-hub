// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "../../../models/user";
import { connectToDb } from "../../../utils/database";

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });


// console.log({
//   clientId: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_SECRET,
// });


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
          const password = Math.random().toString(36).slice(-8);
    
          const nameParts = profile.name.split(" ");
          const firstName = nameParts.slice(1).join(" ");
          const lastName = nameParts[0];
    
          let image;
          let userName;
          if (profile.avatar_url) {
            image = profile.avatar_url;
            userName = profile.login;
          } else if (profile.picture) {
            image = profile.picture;
            userName = profile.email;
          } else {
            image = ''; 
            userName = '';
          }
    
          await User.create({
            email: profile.email,
            firstName: firstName,
            lastName: lastName,
            userName: profile.login,
            password: password,
            image: image,
          });
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
