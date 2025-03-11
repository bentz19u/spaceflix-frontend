'use client';

import React from 'react';
import CheckboxCheck from '@/app/assets/icons/checkbox-check.svg';

interface InputCheckboxProps {
  id: string;
  label: string;
}

export default function InputCheckbox({ id, label }: InputCheckboxProps) {
  return (
    <>
      <label htmlFor={id} className='mb-5 flex cursor-pointer items-center gap-2'>
        <input type='checkbox' id={id} name={id} defaultChecked={true} className='peer hidden' />
        <div
          className='flex h-4 w-4 items-center justify-center rounded-sm border transition-colors duration-200 peer-checked:bg-white'
          aria-hidden='true'
        >
          <CheckboxCheck className='text-black' />
        </div>
        {label}
      </label>
    </>
  );
}
