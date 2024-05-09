//middleware.ts

/*import { NextResponse } from "next/server";
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
  }                                         // If the user is authenticated and trying to access the register page, redirect to dashboard

  // If the route is a dynamic username page and the user is authenticated, allow access
  if (pathname.startsWith("/")) {
    const segments = pathname.split("/");
    if (segments.length === 2 && segments[1] !== "") {
      // It's a dynamic username page
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

  // Check if the route is a dynamic post page (/post/:postId)
  const postMatch = pathname.match(/^\/post\/([a-zA-Z0-9_-]+)$/);
  if (postMatch) {
    // Extract postId from the pathname
    const postId = postMatch[1];

    // Implement your authorization logic here (e.g., check if the user is authorized to access this specific post)
    const userAuthorized = true; // Replace with your authorization logic

    if (userAuthorized) {
      return NextResponse.next(); // Allow access to the post route
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
};*/


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define the middleware function
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

  // Check if the requested route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next(); // Allow access to public routes
  }

  // Redirect unauthenticated users to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode token and check for expiration
  const decodedToken = jwt.decode(token) as { exp?: number };
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (decodedToken.exp !== undefined && decodedToken.exp < currentTimestamp) {
    console.log("Token has expired");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from login or registration pages to the dashboard
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Implement placeholder authorization logic based on route type
  if (pathname.startsWith("/user/")) {
    // Dynamic username page (/user/:username)
    const segments = pathname.split("/");
    const username = segments[2];

    // Example authorization logic: Check if the user has access to the requested username
    const userAuthorized = checkUserAccess(username, decodedToken.userId); // Replace with your actual authorization logic

    if (userAuthorized) {
      return NextResponse.next(); // Allow access to dynamic username pages
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Redirect unauthorized users
    }
  }

  if (pathname.startsWith("/user/") && pathname.includes("/post/")) {
    // Dynamic post page (/user/:username/post/:postId)
    const [_, username, postId] = pathname.split("/");
    
    // Placeholder authorization logic for post access
    const userAuthorized = checkPostAccess(postId, decodedToken.userId); // Replace with actual authorization logic

    if (userAuthorized) {
      return NextResponse.next(); // Allow access to dynamic post pages
    } else {
      return NextResponse.error(new Error("Unauthorized access to post")); // Handle unauthorized access
    }
  }

  // Allow access to the dashboard for authenticated users
  if (pathname === "/dashboard") {
    return NextResponse.next();
  }

  // Redirect to the dashboard for any routes not explicitly allowed or denied
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

// Placeholder function to check user access to a specific username
function checkUserAccess(username: string, userId: string): boolean {
  // Example logic: Check if the requested username matches the authenticated user's ID
  return username === userId;
}

// Placeholder function to check user access to a specific post
function checkPostAccess(postId: string, userId: string): boolean {
  // Example logic: Check if the user is authorized to access the requested post
  // Implement your own authorization checks based on your application's requirements
  return true; // Placeholder logic (replace with actual authorization checks)
}

// Export the middleware configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};




