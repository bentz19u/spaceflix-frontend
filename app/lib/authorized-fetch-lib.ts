import { cookies } from 'next/headers';

export async function authorizedFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const headers: any = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
}
