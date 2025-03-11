'use client';

import cn from '@/app/lib/cn';
import FormInputError from '@/app/ui/form-input-error';
import React from 'react';

interface InputEmailProps {
  id: string;
  label: string;
  placeholder: string;
  error: string | undefined;
  onBlurAction?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputEmail({
  id,
  label,
  placeholder,
  error,
  onBlurAction = () => {},
}: InputEmailProps) {
  return (
    <>
      <input
        type='text'
        id={id}
        name={id}
        className={cn(
          'peer block w-full appearance-none rounded-lg border-0 border-white bg-blue-950 px-2.5 pt-5 pb-2.5 text-sm text-white',
          'focus:ring-2 focus:ring-white',
          error ? 'ring-2 ring-red-500' : ''
        )}
        defaultValue='daniel.bentz@test.com'
        placeholder={placeholder}
        onBlur={onBlurAction ?? (() => {})}
      />
      <label
        htmlFor={id}
        className='absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500'
      >
        {label}
      </label>
      {error && <FormInputError errorMessage={error} />}
    </>
  );
}
