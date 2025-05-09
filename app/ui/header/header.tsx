import { cookie } from '@/app/ui/fonts';
import LanguagesSelector from '@/app/ui/header/languages-selector';
import cn from '@/app/lib/cn';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/app/i18n/routing';

export default async function Header({ locale }: { locale: string }) {
  const t = await getTranslations();

  return (
    <header className={cn('fixed top-0 z-50 flex h-20 w-full bg-black/0 px-0', 'sm:px-5')}>
      <div
        id='header-content'
        className='mx-auto flex flex-row content-center items-center justify-between'
      >
        <Link href='/'>
          <div
            id='header-logo'
            className={cn(`${cookie.className} pl-5 text-3xl text-red-600`, 'sm:pl-0 sm:text-5xl')}
          >
            Spaceflix
          </div>
        </Link>
        <div className={cn('flex flex-row pr-5', 'sm:pr-0')}>
          <LanguagesSelector local={locale} />
          <Link
            href='/login'
            className='flex min-h-8 min-w-15 items-center justify-center rounded-lg bg-red-600 px-3'
          >
            {t('header.signIn')}
          </Link>
        </div>
      </div>
    </header>
  );
}
