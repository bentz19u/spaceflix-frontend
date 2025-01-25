import { AuthorizedFetcher } from '@/app/lib/authorized-fetch-lib';

export async function GET(req: Request) {
  const fetcher = new AuthorizedFetcher();
  const response = await fetcher.fetch(
    'http://localhost:3000/test-access-token',
    {
      method: 'GET',
    }
  );

  return new Response(JSON.stringify(response), { status: response.status });
}
