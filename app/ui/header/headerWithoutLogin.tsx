import { Link } from '@/app/i18n/routing';
import LanguagesSelector from '@/app/ui/header/languages-selector';
import cn from '@/app/lib/cn';
import { getTranslations } from 'next-intl/server';
import { cookie } from '@/app/ui/fonts';

export default async function HeaderWithoutLogin({ locale }: { locale: string }) {
  const t = await getTranslations();

  return (
    <header
      className={cn(
        'absolute top-0 z-50 flex h-20 w-full items-center bg-black px-0',
        'sm:bg-black/0 sm:px-5'
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full flex-row content-center items-center justify-between',
          'sm:w-5xl'
        )}
      >
        <Link href='/'>
          <div
            id='header-logo'
            className={cn(`${cookie.className} pl-5 text-3xl text-red-600`, 'sm:pl-0 sm:text-5xl')}
          >
            Spaceflix
          </div>
        </Link>

        <LanguagesSelector local={locale} />
      </div>
    </header>
  );
}
