'use client';

import { FormEvent, useState } from 'react';
import { clientAuthorizedFetcher } from '@/app/lib/client-authorized-fetch-lib';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const rememberMe = formData.get('rememberMe') == 'on';

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        setErrorMessage(null);
        // router.push('/profile');
      } else {
        setErrorMessage('Incorrect email or password');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRouteHandlerClick() {
    const data = await Promise.all([
      clientAuthorizedFetcher('/api/auth/test-access-token', 'GET'),
      clientAuthorizedFetcher('/api/auth/test-access-token2', 'GET'),
      clientAuthorizedFetcher('/api/auth/test-access-token3', 'GET'),
    ]);
  }

  return (
    <form
      id='login-form'
      onSubmit={handleSubmit}
      className='flex h-full flex-col justify-between py-10'
    >
      <header className='mb-5 min-h-10'>Sign In</header>

      {errorMessage && (
        <div className='rounded-lg bg-yellow-500 p-2.5 text-black'>
          {errorMessage}
        </div>
      )}

      <div className='flex flex-grow-[0.5] flex-col justify-between'>
        <div className='relative'>
          <input
            type='text'
            id='email'
            name='email'
            className='block w-full appearance-none rounded-lg border-0 border-white bg-blue-950 px-2.5 pt-5 pb-2.5 text-sm text-white focus:ring-2 focus:ring-white'
            defaultValue='daniel.bentz@test.com'
            placeholder=' '
          />
          <label
            htmlFor='email'
            className='absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Email
          </label>
        </div>

        <div className='relative'>
          <input
            type='password'
            id='password'
            name='password'
            className='block w-full appearance-none rounded-lg border-0 border-white bg-blue-950 px-2.5 pt-5 pb-2.5 text-sm text-white focus:ring-2 focus:ring-white'
            defaultValue='password'
            placeholder=' '
          />
          <label
            htmlFor='password'
            className='absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Password
          </label>
        </div>

        <div>
          <input
            type='checkbox'
            id='rememberMe'
            name='rememberMe'
            placeholder='Password'
            defaultChecked={true}
            className='h-4 w-4 cursor-pointer appearance-none rounded-sm accent-black ring-1 ring-gray-500 checked:appearance-auto checked:accent-white hover:ring-1 hover:ring-white'
          />
          <label htmlFor='rememberMe' className='ms-2 cursor-pointer'>
            Remember me
          </label>
        </div>
        <button
          type='submit'
          className='min-h-10 cursor-pointer rounded-lg bg-red-600 disabled:bg-red-800'
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
          ) : (
            'Sign in'
          )}
        </button>
      </div>

      <footer className='mt-5 min-h-10'>
        <p>New to Spaceflix? Sign up now.</p>
        <button
          type='button'
          onClick={handleRouteHandlerClick}
          className='mt-4 cursor-pointer'
        >
          Test Access token (By route handler)
        </button>
      </footer>
    </form>
  );
}
