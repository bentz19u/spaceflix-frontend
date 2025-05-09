'use client';

import React, { useEffect, useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import { Link, usePathname } from '@/app/i18n/routing';
import cn from '@/app/lib/cn';
import LanguageIcon from '@/app/assets/icons/language.svg';
import ArrowDown from '@/app/assets/icons/arrow-down.svg';

export default function LanguagesSelector(locale: { local: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLanguageName = (locale: string) => {
    switch (locale) {
      case 'fr':
        return 'Français';
      default:
        return 'English';
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleClickLanguage = (lang: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    setCookie('preferredLanguage', lang);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !dropdownRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      <button
        id='header-language'
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-controls='language-dropdown'
        className={cn(
          'mx-auto mr-5 flex min-h-8 min-w-15 flex-row items-center justify-center rounded-lg border-1 border-gray-400 bg-black text-white',
          'sm:min-w-30'
        )}
      >
        <span className={cn('hidden', 'sm:block')}>{getLanguageName(locale.local)}</span>
        <span className={cn('block', 'sm:hidden')}>
          <LanguageIcon className='text-white' />
        </span>
        <ArrowDown width={20} height={20} />
      </button>

      <div
        className={`absolute z-10 mt-1 min-w-[120px] rounded-lg bg-neutral-900/90 ${isDropdownOpen ? '' : 'hidden'}`}
      >
        <ul
          className='py-2 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='header-language'
        >
          <li>
            <Link
              href={pathname}
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => toggleClickLanguage('en')}
              locale='en'
            >
              English
            </Link>
          </li>
          <li>
            <Link
              href={pathname}
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => toggleClickLanguage('fr')}
              locale='fr'
            >
              Français
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
