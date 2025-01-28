import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className='flex h-screen items-center justify-center bg-black'>
      <div className='h-[60vh] min-w-[400px] bg-neutral-900 pl-10 pr-10'>
        LOGIN PAGE
        <LoginForm />
      </div>
    </main>
  );
}
