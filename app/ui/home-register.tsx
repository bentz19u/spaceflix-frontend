'use client';

import cn from '@/app/lib/cn';
import { Link } from '@/app/i18n/routing';
import ArrowRight from '@/app/assets/icons/arrow-right.svg';
import React from 'react';

export default function HomeRegister() {
  return (
    <div className={cn('flex flex-col gap-5', 'sm:flex-row sm:gap-0')}>
      <div className='relative mr-2 h-14 w-full'>
        <input
          type='email'
          id='email'
          name='email'
          className={cn(
            'peer block h-full w-full rounded-lg border-1 border-gray-400 bg-neutral-900/90 px-2.5 pt-5 pb-2.5 text-sm text-white',
            'focus:ring-2 focus:ring-white focus:outline-none'
          )}
          defaultValue='db.daniel.bentz@gmail.com'
          placeholder=''
        />
        <label
          htmlFor='email'
          className={cn(
            'absolute start-2.5 top-5 z-10 mt-0 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300',
            'peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
            'peer-focus:top-5 peer-focus:-translate-y-4 peer-focus:scale-75'
          )}
        >
          Email address
        </label>
      </div>
      <Link
        href='/register'
        className={cn(
          'mx-auto flex h-14 min-w-20 items-center justify-center rounded-lg bg-red-600 px-3 text-lg font-bold whitespace-nowrap',
          'sm:mx-0 sm:min-w-36',
          'lg:min-w-56 lg:text-2xl'
        )}
      >
        <span className={cn('mr-2', 'lg:mr-4')}>Get started</span>
        <ArrowRight />
      </Link>
    </div>
  );
}
