import { cookies } from 'next/headers';
import { AuthorizedFetcher } from '@/app/lib/authorized-fetch-lib';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

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

  AuthorizedFetcher.assignCookiesTokens(result, cookieStore);

  return new Response(JSON.stringify(result), { status: 201 });
}
