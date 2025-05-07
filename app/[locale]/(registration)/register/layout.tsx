'use client';

import React, { PropsWithChildren } from 'react';
import { RegistrationProvider } from '@/app/context/registration-context';

export default function RegisterLayout({ children }: PropsWithChildren) {
  return <RegistrationProvider>{children}</RegistrationProvider>;
}
