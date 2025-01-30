import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { LoginResponse } from '@/app/api/auth/login/route';
import { cookies } from 'next/headers';
import { ErrorResponse } from '@/app/lib/global-backend-api-response';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthorizedFetcher {
  private static refreshToken: any;
  private static instance: AuthorizedFetcher | null = null;
  private static isRefreshing = false;
  private static pendingRequests: {
    url: string;
    options: RequestInit;
    resolve: (value: Response) => void;
    reject: (reason?: any) => void;
  }[] = [];

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
  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    const response = await this.doFetch(url, options);

    // all good
    if (response.ok) return response;
    else if (response.status === 401) {
      // access token has expired, we will check the refresh token
      if (!AuthorizedFetcher.isRefreshing) {
        AuthorizedFetcher.isRefreshing = true;

        try {
          const success = await this.refresh();
          if (success) {
            // after refreshing, retry all failed requests
            this.retryPendingRequests();
          }
        } catch (error) {
          return new Response(null, {
            status: 401,
            headers: { Location: '/login' },
          });
        } finally {
          AuthorizedFetcher.isRefreshing = false;
        }
      } else {
        // if refresh is already in progress, queue the current request to be retried after refresh
        return new Promise<Response>((resolve, reject) => {
          AuthorizedFetcher.pendingRequests.push({
            url,
            options,
            resolve,
            reject,
          });
        });
      }
    }

    return response; // return error response
  }

  private async doFetch(url: string, options: RequestInit): Promise<Response> {
    const headers: any = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return fetch(url, { ...options, headers });
  }

  private retryPendingRequests() {
    const requestsToRetry = AuthorizedFetcher.pendingRequests.splice(0);

    requestsToRetry.forEach(({ url, options, resolve, reject }) => {
      this.doFetch(url, options).then(resolve).catch(reject);
    });
  }

  private expirePendingRequests() {
    // Iterate through all the pending requests and reject them with the provided error
    AuthorizedFetcher.pendingRequests.forEach(({ reject }) => {
      return new Response(null, {
        status: 401,
        headers: { Location: '/login' },
      });
    });

    // Clear the pending requests queue
    AuthorizedFetcher.pendingRequests = [];
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
    AuthorizedFetcher.assignCookiesTokens(
      result as RefreshResponse,
      cookieStore
    );
    AuthorizedFetcher.refreshToken = result.refreshToken;

    return true;
  }

  private async forceLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    // reject all pending requests with an error to expire them
    this.expirePendingRequests();

    // throw an error to signal for redirection
    throw new Error('Unauthorized - Redirect to login');
  }

  private isErrorResponse(result: any): result is ErrorResponse {
    return result && 'error' in result && typeof result.error === 'object';
  }

  // also used in the Login endpoint
  static assignCookiesTokens(
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
