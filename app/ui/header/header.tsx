import { cookie } from '@/app/ui/fonts';
import Link from 'next/link';
import { getDictionary } from '@/app/[lang]/dictionaries';
import LanguagesSelector from '@/app/ui/header/languages-selector';

export default async function Header({
  dictionary,
  locale,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['header'];
  locale: string;
}) {
  return (
    <header className='sticky top-0 z-50 flex h-20 bg-black/0 sm:bg-neutral-900/0'>
      <div
        id='header-content'
        className='mx-auto flex flex-row content-center items-center justify-between'
      >
        <div id='header-logo' className={`${cookie.className} md:px text-5xl text-red-600`}>
          Spaceflix
        </div>
        <div className='flex flex-row'>
          <LanguagesSelector local={locale} />
          <Link
            href='/login'
            className='flex min-h-8 min-w-15 items-center justify-center rounded-lg bg-red-600 px-3'
          >
            {dictionary.signIn}
          </Link>
        </div>
      </div>
    </header>
  );
}
