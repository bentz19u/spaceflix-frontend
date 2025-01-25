import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { LoginResponse } from '@/app/api/auth/login/route';
import { cookies } from 'next/headers';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthorizedFetcher {
  private cookieStore: ReadonlyRequestCookies | any;

  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    this.cookieStore = await cookies();
    const response = await this.doFetch(url, options);

    if (response.ok) {
      return response;
    } else if (response.status === 401) {
      const refreshToken = this.cookieStore.get('refreshToken')?.value;
      if (refreshToken) {
        await this.refresh(refreshToken);

        // Retry the original request
        return this.doFetch(url, options);
      }
    }

    return response; // Return error response
  }

  private async doFetch(url: string, options: RequestInit): Promise<Response> {
    const headers: any = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    const accessToken = this.cookieStore.get('accessToken')?.value;
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return fetch(url, { ...options, headers });
  }

  private async refresh(refreshToken: string): Promise<void> {
    const response = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const tokens = (await response.json()) as RefreshResponse;
    AuthorizedFetcher.assignTokens(tokens, this.cookieStore);
  }

  // also used in the Login endpoint
  static assignTokens(
    tokens: LoginResponse | RefreshResponse,
    cookieStore: ReadonlyRequestCookies
  ): void {
    cookieStore.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}
