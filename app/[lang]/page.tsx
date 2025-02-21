import React from 'react';
import Link from 'next/link';
import cn from '@/app/lib/cn';

export default async function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent from-10% to-black'></div>
      <div className={cn('z-10 mx-auto flex max-w-sm flex-col text-center', 'lg:max-w-2xl')}>
        <div className={cn('mx-auto mb-5 text-3xl font-bold', 'sm:text-4xl', 'lg:text-6xl')}>
          Unlimited movies, TV shows, and more
        </div>
        <div className={cn('mb-5 text-base font-bold', 'sm:text-lg')}>
          Starts at FREE (it's for practice after all). Cancel anytime.
        </div>
        <div className='mb-4'>
          Ready to watch? Enter your email to create or restart your membership.
        </div>
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              role='img'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              data-icon='ChevronRightStandard'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z'
                fill='currentColor'
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
