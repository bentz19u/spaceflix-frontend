'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguagesSelector(locale: { local: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  //
  // const value = useRouter();
  // console.log(value);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative inline-block'>
      <button
        id='header-language'
        onClick={toggleDropdown}
        className='mx-auto mr-5 flex min-h-8 min-w-30 flex-row items-center justify-center rounded-lg border-1 border-white bg-black text-white'
      >
        {(() => {
          switch (locale) {
            default:
              return 'English';
          }
        })()}
        <svg
          className='-mr-1 size-5 text-gray-400'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
          data-slot='icon'
        >
          <path
            fillRule='evenodd'
            d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      <div
        className={`absolute z-10 mt-1 min-w-[120px] rounded-lg bg-neutral-900/90 ${isDropdownOpen ? '' : 'hidden'}`}
      >
        <ul
          className='py-2 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='header-language'
        >
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              English
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              Français
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
