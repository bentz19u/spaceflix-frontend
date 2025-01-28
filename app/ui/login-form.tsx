'use client';

import { FormEvent } from 'react';
import { clientAuthorizedFetcher } from '@/app/lib/client-authorized-fetch-lib';

export default function LoginForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    // if (response.ok) {
    //   // router.push('/profile');
    // } else {
    //   // Handle errors
    // }
  }

  async function handleRouteHandlerClick() {
    // for test purpose
    const data = await clientAuthorizedFetcher(
      '/api/auth/test-access-token',
      'GET'
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex h-full flex-col justify-between py-16'
    >
      <h1>Sign In</h1>
      <div className='flex flex-col'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          placeholder='Email'
          defaultValue='daniel.bentz@test.com'
          className='text-black'
          required
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          defaultValue='password'
          className='text-black'
          required
        />
      </div>
      <div>
        <input
          type='checkbox'
          name='rememberMe'
          placeholder='Password'
          defaultChecked={true}
        />
        <label htmlFor='rememberMe'>Remember me</label>
      </div>
      <button type='submit' className='bg-red-600'>
        Sign In
      </button>
      <button type='button' onClick={handleRouteHandlerClick}>
        Test Access token (By route handler)
      </button>
    </form>
  );
}
