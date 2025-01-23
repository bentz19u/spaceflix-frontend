import { cookies } from 'next/headers';
import { LoginResponse } from '@/app/lib/backend-api';

export async function POST(req: Request) {
  const { email, password, rememberMe } = await req.json();

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      remote_addr: '100.250.240.160',
    },
    body: JSON.stringify({
      email,
      password,
      rememberMe,
    }),
  });

  const result = (await response.json()) as LoginResponse | any;

  const cookieStore = await cookies();

  // set the cookies using server-side function
  cookieStore.set('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // set cookie expiration to 1 week
  });

  cookieStore.set('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // set cookie expiration to 1 week
  });

  return new Response(JSON.stringify(result), { status: 201 });
}
