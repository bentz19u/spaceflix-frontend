import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <div className='flex justify-center pt-2'>
      <div className='h-[600px] min-w-[400px] rounded-lg bg-neutral-900/90 pr-10 pl-10'>
        LOGIN COMPONENT
        <LoginForm />
      </div>
    </div>
  );
}
