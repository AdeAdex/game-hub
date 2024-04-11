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
  ];

  // If the requested route is public, allow access
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
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
  }

  // If the route is a dynamic username page and the user is authenticated, allow access
  if (pathname.startsWith("/")) {
    const segments = pathname.split("/");
    if (segments.length === 2 && segments[1] !== "") {
      // It's a dynamic username page
      return NextResponse.next();
    }
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
