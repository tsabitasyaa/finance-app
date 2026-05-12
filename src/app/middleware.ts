import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!';
const encodedKey = new TextEncoder().encode(secretKey);

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const session = request.cookies.get('session')?.value;
  let user = null;
  
  if (session) {
    try {
      const { payload } = await jwtVerify(session, encodedKey);
      user = payload;
    } catch (error) {
      // Invalid session
      console.error('Invalid session:', error);
    }
  }
  
  // Redirect to dashboard if already logged in
  if (user && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect to login if not logged in and accessing protected route
  if (!user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};