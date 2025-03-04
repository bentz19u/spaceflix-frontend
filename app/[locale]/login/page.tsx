import LoginForm from '@/app/ui/login-form';
import cn from '@/app/lib/cn';

export default async function LoginPage() {
  return (
    <div className='flex justify-center pt-2 pt-20'>
      <div
        className={cn(
          'h-[600px] min-w-full rounded-lg bg-neutral-900/90 px-3',
          'sm:min-w-[400px] sm:px-10'
        )}
      >
        <LoginForm />
      </div>
    </div>
  );
}
