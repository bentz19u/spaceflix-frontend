import FormInputError from '@/app/ui/form-input-error';
import React from 'react';
import Link from 'next/link';
import cn from '@/app/lib/cn';

export default async function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent from-10% to-black'></div>
      <div className='z-10 mx-auto flex max-w-2xl flex-col text-center'>
        <div className='mx-auto mb-5 text-6xl font-bold'>Unlimited movies, TV shows, and more</div>
        <div className='mb-5 font-bold'>
          Starts at FREE (it's for practice after all). Cancel anytime.
        </div>
        <div className='mb-4'>
          Ready to watch? Enter your email to create or restart your membership.
        </div>
        <div className={cn('flex flex-col', 'sm:flex-row')}>
          <div className='relative mr-2 w-full'>
            <input
              type='email'
              id='email'
              name='email'
              className={cn(
                'peer block w-full rounded-lg border-1 border-gray-400 bg-neutral-900/90 px-2.5 pt-5 pb-2.5 text-sm text-white',
                'focus:ring-2 focus:ring-white focus:outline-none'
              )}
              defaultValue='db.daniel.bentz@gmail.com'
              placeholder=''
            />
            <label
              htmlFor='email'
              className={cn(
                'absolute start-2.5 top-4 z-10 mt-0 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300',
                'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
                'peer-focus:-translate-y-4 peer-focus:scale-75'
              )}
            >
              Email address
            </label>
          </div>
          <Link
            href='/register'
            className='flex h-full min-w-15 items-center justify-center rounded-lg bg-red-600 px-3 whitespace-nowrap'
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
