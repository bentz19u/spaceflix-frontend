'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRegistration } from '@/app/context/registration-context';
import { createLocalizedPath } from '@/app/lib/url';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import CheckboxCheck from '@/app/assets/icons/checkbox-check.svg';

export default function Step2() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();

  const { formData } = useRegistration();

  useEffect(() => {
    if (!formData.email) {
      const url = createLocalizedPath(locale, '/register');
      router.push(url);
    }
  }, [formData.email, locale, router]);

  if (!formData.email) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className='flex h-full max-w-[350px] flex-col justify-between gap-3 py-20'>
      <p className='font-semibold'>Step 2 of 3</p>
      <p className='text-2xl font-bold'>{t('step2.title')}</p>
      <div className='mt-2 flex flex-row items-center'>
        <CheckboxCheck className='mr-3 h-4 w-4 text-red-500' />
        {t('step2.desc1')}
      </div>
      <div className='flex flex-row items-center'>
        <CheckboxCheck className='mr-3 h-4 w-4 text-red-500' />
        {t('step2.desc2')}
      </div>
      <div className='mb-3 flex flex-row items-center'>
        <CheckboxCheck className='mr-3 h-4 w-4 text-red-500' />
        {t('step2.desc3')}
      </div>

      <button
        type='submit'
        className='min-h-10 cursor-pointer rounded-lg bg-red-600 transition-colors duration-200 disabled:bg-red-800'
      >
        {t('common.next')}
      </button>
    </div>
  );
}
