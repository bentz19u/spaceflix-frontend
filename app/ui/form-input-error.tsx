import ErrorCross from '@/app/assets/icons/error-cross.svg';

export default function FormInputError({ errorMessage }: { errorMessage: string }) {
  return (
    <div className='mt-1 flex flex-row items-center text-red-500'>
      <div className='mr-1'>
        <ErrorCross />
      </div>
      {errorMessage}
    </div>
  );
}
