import React from 'react';
import cn from '@/app/lib/cn';

import HomeRegister from '@/app/ui/home-register';
import { getLocale, getTranslations } from 'next-intl/server';
import Header from '@/app/ui/header/header';

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <>
      <Header locale={locale} />
      <div className='flex h-screen flex-col items-center justify-center'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-10% to-black'></div>
        <div className={cn('z-10 mx-auto flex max-w-sm flex-col px-5 text-center', 'lg:max-w-2xl')}>
          <div className={cn('mx-auto mb-5 text-3xl font-bold', 'sm:text-4xl', 'lg:text-6xl')}>
            {t('home.title')}
          </div>
          <div className={cn('mb-5 text-base font-bold', 'sm:text-lg')}>{t('home.desc1')}</div>
          <div className='mb-4'>{t('home.desc2')}</div>
          <HomeRegister />
        </div>
      </div>
    </>
  );
}
