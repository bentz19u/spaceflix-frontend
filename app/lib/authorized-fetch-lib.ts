import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { LoginResponse } from '@/app/api/auth/login/route';
import { cookies } from 'next/headers';
import { ErrorResponse } from '@/app/lib/global-backend-api-response';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthorizedFetcher {
  private cookieStore: ReadonlyRequestCookies | any;

  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    this.cookieStore = await cookies();
    const response = await this.doFetch(url, options);

    // all good
    if (response.ok) {
      return response;
    } else if (response.status === 401) {
      // unauthorized, we will refresh tokens
      const refreshToken = this.cookieStore.get('refreshToken')?.value;
      if (refreshToken) {
        const success = await this.refresh(refreshToken);
        // retry the original request
        if (success) {
          return this.doFetch(url, options);
        }
      }
    }

    return response; // return error response
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

  private async refresh(refreshToken: string): Promise<boolean> {
    const response = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const result = await response.json();

    if (this.isErrorResponse(result)) {
      this.forceLogout();
      return false;
    }

    AuthorizedFetcher.assignTokens(result as RefreshResponse, this.cookieStore);
    return true;
  }

  private forceLogout() {
    this.cookieStore.delete('accessToken');
    this.cookieStore.delete('refreshToken');
  }

  private isErrorResponse(result: any): result is ErrorResponse {
    return result && 'error' in result && typeof result.error === 'object';
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
