
// middleware.js

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('authToken')?.value;

//   if (!token && request.nextUrl.pathname !== '/login') {
//     // If token is not present and user tries to access any page other than login, redirect to login
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (token && request.nextUrl.pathname === '/login') {
//     // If token is present and user tries to access login, redirect to dashboard
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   if (!token && request.nextUrl.pathname === '/dashboard') {
//     // If token is not present and user tries to access dashboard, redirect to login
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // If no redirection conditions are met, allow the request to continue
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  // List of routes accessible to users without authentication
  const publicRoutes = ['/', '/register', '/forgot-password'];

  // List of routes accessible to authenticated users
  const privateRoutes = ['/', '/[username]'];

  // If the requested route is a public route, allow access
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If the user is not authenticated and the route is not public, redirect to login
  if (!token && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated and the route is a private route, allow access
  if (token && privateRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If the user is authenticated but the route is not private, redirect to dashboard
  if (token && request.nextUrl.pathname !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For any other scenario, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
