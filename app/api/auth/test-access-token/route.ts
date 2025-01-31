import { AuthorizedFetcher } from '@/app/lib/authorized-fetch-lib';

export async function GET(req: Request) {
  const fetcher = new AuthorizedFetcher();
  const response = await fetcher.process(
    'http://localhost:3000/test-access-token',
    {
      method: 'GET',
    }
  );

  // AuthorizedFetcher can return a header for redirection, test it later with real case
  return new Response(JSON.stringify(response), {
    status: response.status,
    headers: response.headers,
  });
}
