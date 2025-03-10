import React from 'react';
import cn from '@/app/lib/cn';

import HomeRegister from '@/app/ui/home-register';

export default async function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent from-10% to-black'></div>
      <div className={cn('z-10 mx-auto flex max-w-sm flex-col px-5 text-center', 'lg:max-w-2xl')}>
        <div className={cn('mx-auto mb-5 text-3xl font-bold', 'sm:text-4xl', 'lg:text-6xl')}>
          Unlimited movies, TV shows, and more
        </div>
        <div className={cn('mb-5 text-base font-bold', 'sm:text-lg')}>
          Starts at FREE (it's for practice after all). Cancel anytime.
        </div>
        <div className='mb-4'>
          Ready to watch? Enter your email to create or restart your membership.
        </div>
        <HomeRegister />
      </div>
    </div>
  );
}
