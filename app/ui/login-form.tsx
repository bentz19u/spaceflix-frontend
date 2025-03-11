'use client';

import { FormEvent, useState } from 'react';
import { clientAuthorizedFetcher } from '@/app/lib/client-authorized-fetch-lib';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import InputEmail from '@/app/ui/form/input-email';
import InputPassword from '@/app/ui/form/input-password';
import InputCheckbox from '@/app/ui/form/input-checkbox';
import cn from '@/app/lib/cn';

export default function LoginForm() {
  const t = useTranslations();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailSchema = z.string().email({ message: t('login.emailError') });
  const passwordSchema = z.string().min(8, t('login.passwordError'));

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
    <form id='login-form' onSubmit={handleSubmit} className={cn('mx-2 flex flex-col', 'sm:py-10')}>
      <header className='mb-5 min-h-10'>{t('login.signIn')}</header>

      {errorMessage && (
        <div className='mb-5 rounded-lg bg-yellow-500 p-2.5 text-black'>{errorMessage}</div>
      )}

      <div className='flex flex-col'>
        <div className='relative mb-5'>
          <InputEmail
            id='email'
            label={t('login.email')}
            placeholder=''
            error={formErrors.email}
            onBlurAction={handleBlur}
          />
        </div>

        <div className='relative mb-5'>
          <InputPassword
            id='password'
            label={t('login.password')}
            placeholder=''
            error={formErrors.password}
            onBlurAction={handleBlur}
          />
        </div>

        <InputCheckbox id='rememberMe' label={t('login.rememberMe')} />

        <button
          type='submit'
          className='min-h-10 cursor-pointer rounded-lg bg-red-600 transition-colors duration-200 disabled:bg-red-800'
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
          ) : (
            `${t('login.signIn')}`
          )}
        </button>
      </div>

      <footer className='mt-5 min-h-10'>
        <p>
          {t('login.newToSpaceflix')} {t('login.signUpNow')}
        </p>
        <button type='button' onClick={handleRouteHandlerClick} className='mt-4 cursor-pointer'>
          Test Access token (By route handler)
        </button>
      </footer>
    </form>
  );
}
