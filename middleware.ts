//middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // List of routes accessible to users without authentication
  const publicRoutes = [
    "/",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/forgot-password-email-sent",
    "/login",
    "/admin",
    "/privacy-policy", 
    "/terms-condition",
    "/game-details", 
    "/error",
    "/not-found",
    "/featured-games", 
    "/about", 
    "/services", 
    "/upload-game",
    "/news", 
    "/store", 
    "/support", 
    "/community", 
    "/developer",
    "/games",
  ];


  // If the user is authenticated and trying to access the register page, redirect to dashboard
  if (token && pathname === "/register") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the requested route is public, allow access
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
 

  // Allow access to dynamic game pages
  const gamePageRegex = /^\/game\/([^/]+)$/;
  if (gamePageRegex.test(pathname)) {
    return NextResponse.next();
  }


  // If the user is not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the requested route is public, allow access
  if (publicRoutes.includes(pathname)) {
    // If the user is authenticated and trying to access the register page, redirect to dashboard
    if (token && pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Decode token and check for expiration
  const decodedToken = jwt.decode(token) as { exp?: number };
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

  if (decodedToken.exp !== undefined && decodedToken.exp < currentTimestamp) {
    console.log("Token has expired");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and trying to access the login page, redirect to dashboard
  if (pathname === "/login") {
    // Check if the user is already in the dashboard, if yes, remain in the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } // If the user is authenticated and trying to access the register page, redirect to dashboard

  // If the route is a dynamic username page and the user is authenticated, allow access
  if (pathname.startsWith("/")) {
    const segments = pathname.split("/");
    if (segments.length === 2 && segments[1] !== "") {
      // It's a dynamic username page
      return NextResponse.next();
    }
  }


  if (pathname.startsWith("/")) {
    const segments = pathname.split("/");
    if (segments.length === 3 && segments[1] !== "" && segments[2] === "notifications" || segments[2] === "library" ) {
      // It's a dynamic username notifications page (/username/notifications)
      return NextResponse.next();
    }
  }
  

  // Check if the route is a dynamic username post page (/user/:username/post/:postId)
  const usernamePostRegex = /^\/user\/([^/]+)\/post\/([^/]+)$/;
  const match = pathname.match(usernamePostRegex);

  if (match) {
    // Extract username and postId from the pathname
    const [, username, postId] = match;

    // Implement your authorization logic here (e.g., check if the user is authorized to access this specific post)
    const userAuthorized = true; // Replace with your authorization logic

    if (userAuthorized) {
      return NextResponse.next(); // Allow access to the user's post page
    } else {
      // User is not authorized to access this post, handle accordingly (e.g., return an error or redirect)
      // return NextResponse.error(new Error("Unauthorized access to post"));
    }
  }


  // If the user is authenticated, allow access to the dashboard
  if (pathname === "/dashboard") {
    return NextResponse.next();
  }

  // List of routes accessible to authenticated users
  const privateRoutes = ["/", "/dashboard"];

  // If the user is authenticated and the route is private, allow access
  if (privateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If the route is not public or private, redirect to dashboard
  if (pathname !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is already in the dashboard, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
