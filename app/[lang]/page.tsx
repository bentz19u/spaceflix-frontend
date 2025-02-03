import LoginForm from '@/app/ui/login-form';

export default async function Home() {
  return (
    <div className='flex justify-center pt-2'>
      <div className='h-[500px] min-w-[400px] rounded-lg bg-neutral-900/90 pr-10 pl-10'>
        <LoginForm />
      </div>
    </div>
  );
}
