import LoginForm from '@/app/ui/login-form';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Locale } from '@/i18n-config';
import cn from '@/app/lib/cn';

export default async function LoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className='flex justify-center pt-2 pt-20'>
      <div
        className={cn(
          'h-[600px] min-w-full rounded-lg bg-neutral-900/90 px-3',
          'sm:min-w-[400px] sm:px-10'
        )}
      >
        <LoginForm dictionary={dictionary.login} />
      </div>
    </div>
  );
}
