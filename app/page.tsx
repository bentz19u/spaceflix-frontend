import LoginForm from '@/app/ui/login-form';

export default async function Home() {
  return (
    <div className='flex h-screen justify-center bg-black pt-2'>
      <div className='h-[500px] min-w-[400px] rounded-lg bg-neutral-900 pl-10 pr-10'>
        <LoginForm />
      </div>
    </div>
  );
}
