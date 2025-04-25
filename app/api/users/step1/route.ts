export async function POST(req: Request) {
  const { email, password } = await req.json();

  const response = await fetch(process.env.NEXT_BACKEND_URL + '/users/step1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.status === 204) {
    return new Response(null, { status: 204 });
  }

  const result = await response.json();

  return new Response(JSON.stringify(result), { status: response.status });
}
