'use server';

import { setCookie } from 'cookies-next/server';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(
  email: string,
  password: string,
  rememberMe: boolean
): Promise<void> {
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

// export async function test() {
//   const response = await fetch()
// }
