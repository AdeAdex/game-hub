// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import Activity from "../../../models/activity"; // Import Activity model
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

// Function to log activity
const logActivity = async (userId, device, location) => {
  const activity = new Activity({
    userId,
    type: "login",
    description: "You logged in",
    device, // Add device
    location, // Add location
  });
  await activity.save();
};

async function handleAuthentication(credentials, profile) {
  try {
    await connectToDb();

    if (credentials) {
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
        await logActivity(user._id, device, location); // Log activity

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
        await logActivity(user._id, device, location); // Log activity

        return { email: user.email, token, ...user.toObject() };
      }
    } else if (profile) {
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

    /*  const user = await User.findOne({ email: profile.email });
      await trackLogin(user); // Track login
      await logActivity(user._id, device, location); // Log activity

      return true;*/
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
