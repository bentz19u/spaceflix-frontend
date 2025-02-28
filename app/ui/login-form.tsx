'use client';

import { FormEvent, useState } from 'react';
import { clientAuthorizedFetcher } from '@/app/lib/client-authorized-fetch-lib';
import { z } from 'zod';
import FormInputError from '@/app/ui/form-input-error';
import { getDictionary } from '@/app/[lang]/dictionaries';
import CheckboxCheck from '@/app/assets/icons/checkbox-check.svg';
import cn from '@/app/lib/cn';

export default function LoginForm({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['login'];
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailSchema = z.string().email({ message: dictionary.emailError });
  const passwordSchema = z.string().min(8, dictionary.passwordError);

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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const schema = name === 'email' ? emailSchema : passwordSchema;
    const result = schema.safeParse(value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: result.success ? '' : result.error.issues[0].message,
    }));
  };

  // only to test the race conditions while refreshing tokens
  async function handleRouteHandlerClick() {
    const data = await Promise.all([
      clientAuthorizedFetcher('/api/auth/test-access-token', 'GET'),
      clientAuthorizedFetcher('/api/auth/test-access-token2', 'GET'),
      clientAuthorizedFetcher('/api/auth/test-access-token3', 'GET'),
    ]);
  }

  return (
    <form id='login-form' onSubmit={handleSubmit} className='flex h-full flex-auto flex-col py-10'>
      <header className='mb-5 min-h-10'>{dictionary.signIn}</header>

      {errorMessage && (
        <div className='mb-5 rounded-lg bg-yellow-500 p-2.5 text-black'>{errorMessage}</div>
      )}

      <div className='flex flex-col'>
        <div className='relative mb-5'>
          <input
            type='text'
            id='email'
            name='email'
            className={cn(
              'peer block w-full appearance-none rounded-lg border-0 border-white bg-blue-950 px-2.5 pt-5 pb-2.5 text-sm text-white',
              'focus:ring-2 focus:ring-white',
              formErrors.email ? 'ring-2 ring-red-500' : ''
            )}
            defaultValue='daniel.bentz@test.com'
            placeholder=''
            onBlur={handleBlur}
          />
          <label
            htmlFor='email'
            className='absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            {dictionary.email}
          </label>
          {formErrors.email && <FormInputError errorMessage={formErrors.email} />}
        </div>

        <div className='relative mb-5'>
          <input
            type='password'
            id='password'
            name='password'
            className={cn(
              'peer block w-full appearance-none rounded-lg border-0 border-white bg-blue-950 px-2.5 pt-5 pb-2.5 text-sm text-white',
              'focus:ring-2 focus:ring-white',
              formErrors.password ? 'ring-2 ring-red-500' : ''
            )}
            defaultValue='password'
            placeholder=''
            onBlur={handleBlur}
          />
          <label
            htmlFor='password'
            className='absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            {dictionary.password}
          </label>
          {formErrors.password && <FormInputError errorMessage={formErrors.password} />}
        </div>

        <label htmlFor='rememberMe' className='mb-5 flex cursor-pointer items-center gap-2'>
          <input
            type='checkbox'
            id='rememberMe'
            name='rememberMe'
            defaultChecked={true}
            className='peer hidden'
          />
          <div
            className='flex h-4 w-4 items-center justify-center rounded-sm border transition-colors duration-200 peer-checked:bg-white'
            aria-hidden='true'
          >
            <CheckboxCheck className='text-black' />
          </div>
          {dictionary.rememberMe}
        </label>
        <button
          type='submit'
          className='min-h-10 cursor-pointer rounded-lg bg-red-600 transition-colors duration-200 disabled:bg-red-800'
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
          ) : (
            `${dictionary.signIn}`
          )}
        </button>
      </div>

      <footer className='mt-5 min-h-10'>
        <p>
          {dictionary.newToSpaceflix} {dictionary.signUpNow}
        </p>
        <button type='button' onClick={handleRouteHandlerClick} className='mt-4 cursor-pointer'>
          Test Access token (By route handler)
        </button>
      </footer>
    </form>
  );
}
