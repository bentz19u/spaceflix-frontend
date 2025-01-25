import { authorizedFetch } from '@/app/lib/authorized-fetch-lib';

export async function GET(req: Request) {
  const response = await authorizedFetch(
    'http://localhost:3000/test-access-token',
    {
      method: 'GET',
    }
  );

  const result = await response.json();

  return new Response(JSON.stringify(result), { status: response.status });
}
