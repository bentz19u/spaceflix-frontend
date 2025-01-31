import { LoginResponseDTO } from '@/app/api/auth/login/route';
import { cookies } from 'next/headers';
import { ErrorResponse } from '@/app/lib/global-backend-api-response';

interface RefreshResponseDTO {
  accessToken: string;
  refreshToken: string;
}

interface DoRefreshResponseDTO {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
}

// it will keep in memory the refresh promise for each users
// it's to avoid having multiple queries for one user calling the refresh endpoint
const refreshStates = new Map<string, Promise<DoRefreshResponseDTO>>();

export class AuthorizedFetcher {
  // main method of this class, it will do the query using fetch()
  // but also refresh the tokens if needed
  async process(url: string, options: RequestInit = {}): Promise<Response> {
    const cookieStore = await cookies();
    const accessToken = cookieStore?.get('accessToken')?.value;
    const response = await this.doFetch(url, options, accessToken);

    if (response.status === 401) {
      return await this.handleRefresh(url, options);
    }

    return response;
  }

  private async doFetch(
    url: string,
    options: RequestInit,
    accessToken?: string
  ): Promise<Response> {
    const headers: any = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return fetch(url, { ...options, headers });
  }

  private async handleRefresh(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const cookieStore = await cookies();
    const sessionId = cookieStore?.get('sessionId')?.value || 'global-session';

    // check if refresh is already in progress
    if (!refreshStates.has(sessionId)) {
      // create an observable (Promise) and store it
      refreshStates.set(
        sessionId,
        this.doRefresh().finally(() => {
          refreshStates.delete(sessionId);
        })
      );
    }

    // it's a promise, so we wait for it to be resolved
    const result: DoRefreshResponseDTO | undefined =
      await refreshStates.get(sessionId);

    if (result && result.success) {
      // retry original request
      return await this.doFetch(url, options, result.accessToken);
    } else {
      return new Response(null, {
        status: 401,
        headers: { Location: '/login' },
      });
    }
  }

  private async doRefresh(): Promise<DoRefreshResponseDTO> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore?.get('refreshToken')?.value;

    const response = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const result = await response.json();
    if (this.isErrorResponse(result)) {
      await this.forceLogout();
      return {
        success: false,
      };
    }

    await AuthorizedFetcher.assignTokens(result as RefreshResponseDTO);
    return {
      success: true,
      ...result,
    };
  }

  private async forceLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionID');
  }

  private isErrorResponse(result: any): result is ErrorResponse {
    return result && 'error' in result && typeof result.error === 'object';
  }

  // also used in the Login endpoint
  static async assignTokens(
    tokens: LoginResponseDTO | RefreshResponseDTO
  ): Promise<void> {
    const cookieStore = await cookies();
    const sessionID = cookieStore?.get('sessionID')?.value;

    if (!sessionID) {
      const newSessionID = crypto.randomUUID();
      cookieStore.set('sessionID', newSessionID, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }

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
