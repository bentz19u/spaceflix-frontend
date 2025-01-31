'use client';

import { cookie } from '@/app/ui/fonts';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-20 bg-black/0 sm:bg-neutral-900/0'>
      <div
        id='header-content'
        className='mx-auto flex flex-row content-center items-center justify-between'
      >
        <div
          id='header-logo'
          className={`${cookie.className} md:px text-5xl text-red-600`}
        >
          Spaceflix
        </div>
        <div>
          <Link
            href='/login'
            className='flex min-h-8 min-w-20 items-center justify-center rounded-lg bg-red-600'
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
