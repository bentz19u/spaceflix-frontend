'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRegistration } from '@/app/context/registration-context';
import { createLocalizedPath } from '@/app/lib/url';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step2() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();

  const { formData } = useRegistration();

  useEffect(() => {
    if (!formData.email) {
      const url = createLocalizedPath(locale, '/register');
      router.push(url);
    }
  }, [formData.email, locale, router]);

  if (!formData.email) {
    return <p>Redirecting...</p>;
  }

  return <p>Toto</p>;
}
