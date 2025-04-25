export interface IsRegistrableResponseDTO {
  isAvailable: boolean;
  canActivate: boolean;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(
    process.env.NEXT_BACKEND_URL + '/users/is-registrable?email=' + email,
    {
      method: 'GET',
    }
  );

  const data = (await response.json()) as IsRegistrableResponseDTO;

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
