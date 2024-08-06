// // app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import { connectToDb } from "../../../utils/database";
import { comparePassword } from "../../../utils/bcrypt";
import { generateToken } from "../../../utils/jwtUtils";
import { cookies } from "next/headers";
import logActivity from "../../../utils/activityLogger";

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
          console.log("credentials", credentials)
          
          return await handleAuthentication(credentials, null, "form");
        } catch (error) {
          // Log the error message for debugging purposes
          console.error("Error during authorization:", error.message);
          // Throw the error message to be handled by the signIn callback
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
    async signIn({ profile, account, credentials }) {
      try {
        if (account.provider !== "credentials") {
          await connectToDb();
          return await handleAuthentication(null, profile, account.provider);
        }
        return true;
      } catch (error) {
        console.error("Error occurred during signIn:", error);
        return false;
      }
    },
  },
});

async function handleAuthentication(credentials, profile, provider) {
  try {
    await connectToDb();

    if (credentials && credentials.email && credentials.password) {
      console.log("credentials", credentials)
      console.log("profile", profile)
      const { email, password, location, device } = credentials;
      const user = await User.findOne({
        $or: [{ email: email }, { userName: email }],
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.socialId && !user.password) {
        const token = generateToken({ email: user.email });
        cookies().set("authToken", token, {
          httpOnly: true,
          maxAge: 86400, // 1 day in seconds (60 * 60 * 24)
          path: "/",
          sameSite: "strict",
        });

        await trackLogin(user); // Track login
        await logActivity(
          user._id,
          "login",
          "Logged in using social login",
          device,
          location
        ); // Log activity

        return { email: user.email, token, ...user.toObject() };
      } else {
        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        const token = generateToken({ email: user.email });
        cookies().set("authToken", token, {
          httpOnly: true,
          maxAge: 86400, // 1 day in seconds (60 * 60 * 24)
          path: "/",
          sameSite: "strict",
        });

        await trackLogin(user); // Track login
        await logActivity(
          user._id,
          "login",
          "Logged in using email and password",
          device,
          location
        ); // Log activity

        return { email: user.email, token, ...user.toObject() };
      }
    } else if (profile) {
      // console.log("email", profile.email)
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const nameParts = profile.name.split(" ");
        const lastName = nameParts.slice(1).join(" ");
        const firstName = nameParts[0];
        const profilePicture = profile.avatar_url || profile.picture;
        const userName = profile.login ? profile.login : lastName;
        const socialId = profile.id;

        const newUser = new User({
          email: profile.email,
          firstName,
          lastName,
          userName: userName,
          profilePicture: profilePicture,
          socialId,
        });

        await newUser.save();
      }

      const token = generateToken({ email: profile.email });
      cookies().set("authToken", token, {
        httpOnly: true,
        maxAge: 86400, // 1 day in seconds (60 * 60 * 24)
        path: "/",
        sameSite: "strict",
      });

      const user = await User.findOne({ email: profile.email });
      await trackLogin(user); // Track login
      await logActivity(
        user._id,
        "login",
        `Logged in using ${provider} Auth`,
        "Unknown Device",
        "Unknown Location"
      ); // Log activity

      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to track login
async function trackLogin(user) {
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const loginEntry = user.loginData.find(
    (entry) => entry.date.toISOString().slice(0, 10) === currentDate
  );

  if (loginEntry) {
    loginEntry.count += 1;
  } else {
    user.loginData.push({ date: new Date(), count: 1 });
  }

  await user.save();
}

export { handler as GET, handler as POST };
