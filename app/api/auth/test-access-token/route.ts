import { authorizedFetch } from '@/app/lib/authorized-fetch-lib';

export async function GET(req: Request) {
  const response = await authorizedFetch(
    'http://localhost:3000/test-access-token',
    {
      method: 'GET',
    }
  );

  return new Response(JSON.stringify(response), { status: response.status });
}
