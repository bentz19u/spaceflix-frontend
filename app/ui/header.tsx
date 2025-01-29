'use client';

import { cookie } from '@/app/ui/fonts';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-20 bg-black sm:bg-neutral-900'>
      <div id='header-content' className='mx-auto content-center'>
        <div
          className={`${cookie.className} md:px text-5xl font-bold text-red-600`}
        >
          Spaceflix
        </div>
      </div>
    </header>
  );
}
