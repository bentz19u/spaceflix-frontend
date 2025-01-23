'use client';

import { FormEvent } from 'react';

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

    if (response.ok) {
      // router.push('/profile');
    } else {
      // Handle errors
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex h-full flex-col justify-between pb-20 pt-20'
    >
      <h1>Sign In</h1>
      <input
        type='email'
        name='email'
        placeholder='Email'
        defaultValue='daniel.bentz@test.com'
        className='text-black'
        required
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        defaultValue='password'
        className='text-black'
        required
      />
      <div>
        <input
          type='checkbox'
          name='rememberMe'
          placeholder='Password'
          defaultChecked={true}
        />
        <label htmlFor='rememberMe'>Remember me</label>
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}
