import React, { PropsWithChildren } from 'react';
import { getLocale } from 'next-intl/server';
import cn from '@/app/lib/cn';
import Header from '@/app/ui/header/header';

export default async function RegistrationLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <>
      <div className={cn('flex h-screen flex-col bg-black', 'sm:bg-transparent')}>
        <Header locale={locale} />
        <div className='flex justify-center'>
          <div
            className={cn(
              'mt-20 flex min-w-full flex-col bg-black px-3',
              'sm:min-w-[400px] sm:rounded-lg sm:bg-neutral-900/90 sm:px-10'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
