export async function clientAuthorizedFetcher(url: string, method: string) {
  const response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // token is valid, process the response as needed
    return response;
  } else if (response.status === 401) {
    // unauthorized, redirect to login
    const redirectUrl = response.headers.get('Location');
    if (redirectUrl) {
      // how to do that nextjs style?
      window.location.assign(redirectUrl);
    }
  } else {
    // TODO: better error handling
    console.error('Unexpected error:', response.status);
  }
}
