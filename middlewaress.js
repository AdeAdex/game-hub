// import jwt from "jsonwebtoken";
// import { getSession } from "next-auth/react"

// export async function middleware(request) {
//   const token = request.cookies.get("loginToken")?.value;
//   const session = await getSession({ req: request });
//   // const session = request.cookies.get('next-auth.session-token')


//   if (session?.value) {
//     console.log("session", session?.value);

//   } else {
//     console.log("no session at all bro");
//   }


//   const urlSearchParams = new URLSearchParams(request.url.search);
//   const username = urlSearchParams.get("username");


//   // Exclude the homepage ("/") from token validation
//   if (
//     request.nextUrl.pathname === "/" ||
//     request.nextUrl.pathname === "/register" ||
//     // request.nextUrl.pathname === `/username/${username}` ||
//     request.nextUrl.pathname === "/forgot-password"
//   ) {
//     return;
//   }

//   if (
//     (token /* || session?.value */ ) &&
//     !request.nextUrl.pathname.startsWith("/dashboard")
//   ) {
//     // Decode the token to check if it's expired
//     try {
//       const decodedToken = jwt.decode(token);
//       const currentTimestamp = Math.floor(Date.now() / 1000);

//       if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
//         console.log("Token has expired, redirect to login");
//         request.cookies.delete("loginToken");
//         // return Response.redirect(new URL('/login', request.url));
//       }

//       // Token is valid and not expired, allow access to dashboard
//       return;
//     } catch (error) {
//       // If there's an error decoding the token, redirect to login
//       console.error("Error decoding token:", error);
//       return Response.redirect(new URL("/login", request.url));
//     }
//   }

//   if (
//     (!token/*  || !session?.value */) &&
//     !request.nextUrl.pathname.startsWith("/login")
//   ) {
//     // No token found, redirect to login
//     return Response.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };



