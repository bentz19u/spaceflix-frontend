import LoginForm from '@/app/ui/login-form';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Locale } from '@/i18n-config';

export default async function LoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className='flex justify-center pt-2'>
      <div className='h-[600px] min-w-[400px] rounded-lg bg-neutral-900/90 pr-10 pl-10'>
        <LoginForm dictionary={dictionary.login} />
      </div>
    </div>
  );
}
