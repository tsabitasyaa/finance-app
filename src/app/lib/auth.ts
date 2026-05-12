import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!';
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionUser {
  id: number;
  username: string;
  email: string;
}

export async function createSession(user: SessionUser) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
  
  const session = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);
  
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true di production
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 hari dalam detik
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  
  console.log('Session cookie exists:', !!session);
  console.log('Environment:', process.env.NODE_ENV);
  
  if (!session) return null;
  
  try {
    const { payload } = await jwtVerify(session, encodedKey);
    console.log('Session verified for user:', payload);
    
    const userPayload = payload as JWTPayload;
    if (userPayload.id && userPayload.username && userPayload.email) {
      return {
        id: userPayload.id as number,
        username: userPayload.username as string,
        email: userPayload.email as string,
      };
    }
    return null;
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}

export async function requireAuth() {
  const user = await getSession();
  if (!user) {
    redirect('/login');
  }
  return user;
}