'use client';

import InputPassword from '@/app/ui/form/input-password';
import { useTranslations } from 'next-intl';
import InputEmail from '@/app/ui/form/input-email';
import InputCheckbox from '@/app/ui/form/input-checkbox';
import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/app/ui/utils/loading-spinner';

export default function Page() {
  const t = useTranslations();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailSchema = z.string().email({ message: t('login.emailError') });
  const passwordSchema = z.string().min(8, t('login.passwordError'));

  const searchParams = useSearchParams();
  const searchEmail = searchParams.get('email');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');

      const response = await fetch('/api/users/step1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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

  return (
    <form
      onSubmit={handleSubmit}
      className='flex h-full max-w-[350px] flex-col justify-between gap-3 py-20'
    >
      <p className='font-semibold'>Step 1 of 3</p>
      <p className='text-2xl font-bold'>{t('register.title1')}</p>
      <p className='text-2xl font-bold'>{t('register.title2')}</p>

      <p className='my-2'>
        {t('register.desc1')}
        <br /> {t('register.desc2')}
      </p>

      {errorMessage && (
        <div className='mb-5 rounded-lg bg-yellow-500 p-2.5 text-black'>{errorMessage}</div>
      )}

      <InputEmail
        id='email'
        label={t('login.email')}
        placeholder=''
        defaultValue={searchEmail ?? undefined}
        error={formErrors.email}
        onBlurAction={handleBlur}
      />

      <InputPassword
        id='password'
        label={t('common.password')}
        placeholder=''
        error={formErrors.password}
        onBlurAction={handleBlur}
      />

      <InputCheckbox id='aggreeData' label={t('register.agreeCheckbox')} />

      <button
        type='submit'
        className='min-h-10 cursor-pointer rounded-lg bg-red-600 transition-colors duration-200 disabled:bg-red-800'
      >
        {isLoading ? <LoadingSpinner /> : `${t('register.agreeAndSubmit')}`}
      </button>
    </form>
  );
}
