import { setCookie } from 'cookies-next/server';
import { LoginResponse } from '@/app/lib/backend-api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email, password, rememberMe } = req.body;
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

  await setCookie('accessToken', result.accessToken);
  await setCookie('refreshToken', result.refreshToken);
  console.log(result);
}
