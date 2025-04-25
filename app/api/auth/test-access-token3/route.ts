import { AuthorizedFetcher } from '@/app/lib/authorized-fetch-lib';

export async function GET(req: Request) {
  const fetcher = new AuthorizedFetcher();
  const response = await fetcher.process(process.env.NEXT_BACKEND_URL + '/test-access-token3', {
    method: 'GET',
  });

  // AuthorizedFetcher can return a header for redirection, test it later with real case
  return new Response(JSON.stringify(response), {
    status: response.status,
    headers: response.headers,
  });
}
