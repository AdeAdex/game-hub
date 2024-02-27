// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import { connectToDb } from "../../../utils/database";
// import { comparePassword } from "../../../utils/bcrypt";
// import { generateToken } from "../../../utils/jwtUtils";


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
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Custom authentication logic using your existing route
    //     const { email, password } = credentials;
    //     try {
    //       await connectToDb();
    //       const user = await User.findOne({
    //         $or: [{ email }, { userName: email }],
    //       });

    //       if (!user) {
    //         return Promise.resolve(null);
    //       }

    //       const passwordMatch = await comparePassword(password, user.password);

    //       if (!passwordMatch) {
    //         return Promise.resolve(null);
    //       }

    //       const token = generateToken({ email: user.email });

    //       user.password = undefined;

    //       return Promise.resolve({ ...user, token });
    //     } catch (error) {
    //       console.error("Error during authentication:", error);
    //       return Promise.resolve(null);
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
    
          // await User.create({
          //   email: profile.email,
          //   firstName: firstName,
          //   lastName: lastName,
          //   userName: profile.login,
          //   password: password,
          //   profilePicture: image,
          // });


          const userObject = {
            email: profile.email,
            firstName: firstName,
            lastName: lastName,
            userName: profile.login,
            password: password,
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
