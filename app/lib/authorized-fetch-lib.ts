import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { LoginResponse } from '@/app/api/auth/login/route';

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export async function authorizedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const result = await doFetch(url, options, cookieStore);

  // everything went fine
  if (result.ok) {
    return result;
  } else if (result.status == 401) {
    // in case of unauthorized, that means the access token is expired
    // so we will try to get a new one
    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (refreshToken) {
      await refresh(refreshToken, cookieStore);

      // now that we got new tokens, we try again
      return doFetch(url, options, cookieStore);
    }
  }

  // if we arrive here, that means there was an error, expected or not
  return result;
}

async function doFetch(
  url: string,
  options: RequestInit = {},
  cookieStore: ReadonlyRequestCookies
) {
  const headers: any = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  const token = cookieStore.get('accessToken')?.value;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return await fetch(url, { ...options, headers });
}

async function refresh(
  refreshToken: string,
  cookieStore: ReadonlyRequestCookies
) {
  const response = await fetch('http://localhost:3000/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + refreshToken,
    },
  });

  const result = (await response.json()) as RefreshResponse | any;

  assignTokens(result, cookieStore);
}

export function assignTokens(
  tokens: LoginResponse | RefreshResponse,
  cookieStore: ReadonlyRequestCookies
) {
  // set the cookies using server-side function
  cookieStore.set('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // set cookie expiration to 1 week
  });

  cookieStore.set('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // set cookie expiration to 1 week
  });
}
