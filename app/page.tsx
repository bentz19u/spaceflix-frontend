import LoginForm from '@/app/ui/login-form';

export default async function Home() {
  // await login('daniel.bentz@test.com', 'password', true);

  return (
    <>
      <main className='flex h-screen items-center justify-center bg-black'>
        <div className='h-[60vh] min-w-[400px] bg-neutral-900 pl-10 pr-10'>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
