import LoginForm from '@/app/ui/login-form';
import cn from '@/app/lib/cn';
import HeaderWithoutLogin from '@/app/ui/header/headerWithoutLogin';
import { getLocale } from 'next-intl/server';

export default async function LoginPage() {
  const locale = await getLocale();

  return (
    <div className={cn('flex h-screen flex-col bg-black', 'sm:bg-transparent')}>
      <HeaderWithoutLogin locale={locale} />
      <div className='flex justify-center'>
        <div
          className={cn(
            'mt-20 flex min-w-full flex-col bg-black px-3',
            'sm:h-[600px] sm:min-w-[400px] sm:rounded-lg sm:bg-neutral-900/90 sm:px-10'
          )}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
