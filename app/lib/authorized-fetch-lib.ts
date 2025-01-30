import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { LoginResponse } from '@/app/api/auth/login/route';
import { cookies } from 'next/headers';
import { ErrorResponse } from '@/app/lib/global-backend-api-response';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthorizedFetcher {
  private static accessToken: any;
  private static refreshToken: any;
  private static instance: AuthorizedFetcher | null = null;
  private static isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;

  // to handle smoothly the refresh token (and avoid race conditions)
  // AuthorizedFetcher has to be a singleton, getInstance() handle that
  static getInstance(): AuthorizedFetcher {
    if (!this.instance) {
      this.instance = new AuthorizedFetcher();
    }
    return this.instance;
  }

  // main method of this class, it will do the query using fetch()
  // but also refresh the tokens if needed
  async process(url: string, options: RequestInit = {}): Promise<Response> {
    const response = await this.doFetch(url, options);

    if (response.status === 401) {
      // access token has expired, we will check the refresh token
      if (!AuthorizedFetcher.isRefreshing) {
        AuthorizedFetcher.isRefreshing = true;

        let success = false;
        try {
          success = await this.refresh();
        } catch (error) {
          return new Response(null, {
            status: 401,
            headers: { Location: '/login' },
          });
        } finally {
          AuthorizedFetcher.isRefreshing = false;
        }

        if (success) {
          // after refreshing, retry all failed requests
          return await this.doFetch(url, options);
        }
      } else {
        // wait for refresh to finish if it's already in progress
        await this.waitForRefreshToComplete();
        return await this.doFetch(url, options);
      }
    }

    // add error handling
    return response; // return error response
  }

  private async doFetch(url: string, options: RequestInit): Promise<Response> {
    if (!AuthorizedFetcher.accessToken) {
      // force a re-read of cookies here to get the latest refresh token
      const cookieStore = await cookies();
      AuthorizedFetcher.accessToken = cookieStore?.get('accessToken')?.value;
    }

    const headers: any = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    if (AuthorizedFetcher.accessToken) {
      headers['Authorization'] = `Bearer ${AuthorizedFetcher.accessToken}`;
    }

    return fetch(url, { ...options, headers });
  }

  private async waitForRefreshToComplete(): Promise<void> {
    if (!this.refreshPromise) {
      this.refreshPromise = new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (!AuthorizedFetcher.isRefreshing) {
            clearInterval(interval);
            clearTimeout(timeout);
            resolve();
          }
        }, 100);

        // 10 seconds timeout
        const timeout = setTimeout(() => {
          clearInterval(interval);
          reject(new Error('Refresh token process took too long'));
        }, 10000);
      });
    }

    return this.refreshPromise;
  }

  private async refresh(): Promise<boolean> {
    if (!AuthorizedFetcher.refreshToken) {
      // force a re-read of cookies here to get the latest refresh token
      const cookieStore = await cookies();
      AuthorizedFetcher.refreshToken = cookieStore?.get('refreshToken')?.value;
    }

    const response = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthorizedFetcher.refreshToken}`,
      },
    });

    const result = await response.json();
    if (this.isErrorResponse(result)) {
      await this.forceLogout();
      return false;
    }

    const cookieStore = await cookies();
    AuthorizedFetcher.assignTokens(result as RefreshResponse, cookieStore);

    return true;
  }

  private async forceLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    AuthorizedFetcher.accessToken = null;
    AuthorizedFetcher.refreshToken = null;

    // throw an error to signal for redirection
    throw new Error('Unauthorized - Redirect to login');
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

    AuthorizedFetcher.accessToken = tokens.accessToken;
    AuthorizedFetcher.refreshToken = tokens.refreshToken;
  }
}
