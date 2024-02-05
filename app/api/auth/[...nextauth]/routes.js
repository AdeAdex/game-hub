import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



console.log({
  clientId: process.env.GOGGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
//   getProviders,
//   useSession,
// } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOGGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET_SECRET,
//     }),
//   ],
// });

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOGGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
