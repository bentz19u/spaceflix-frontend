'use client';

import InputPassword from '@/app/ui/form/input-password';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const search = searchParams.get('email');

  return (
    <div className='flex h-full flex-col justify-between gap-2 py-20'>
      <p className='font-semibold'>Step 1 of 3</p>
      <p className='text-2xl font-bold'>Welcome back!</p>
      <p className='text-2xl font-bold'>Joining Spaceflix is easy.</p>

      <p className='my-2'>Enter your password and you'll be watching in not time.</p>

      <div className='mb-2'>
        <p>Email</p>
        <p className='font-semibold'>{search}</p>
      </div>

      <InputPassword
        id='password'
        label={t('common.password')}
        placeholder=''
        // error={formErrors.password}
        // onBlurAction={handleBlur}
      />

      <p className='my-2'>Forgot your password?</p>

      <button
        type='submit'
        className='min-h-10 cursor-pointer rounded-lg bg-red-600 transition-colors duration-200 disabled:bg-red-800'
      >
        {t('common.next')}
      </button>
    </div>
  );
}
