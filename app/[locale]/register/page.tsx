'use client';

import InputPassword from '@/app/ui/form/input-password';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import InputEmail from '@/app/ui/form/input-email';
import InputCheckbox from '@/app/ui/form/input-checkbox';

export default function Page() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const search = searchParams.get('email');

  // TODO: temp, will be useful when I add the registration for a deactivated user
  // const [emailEditable, setEmailEditable] = useState(!search);

  // const handleIsRegistrable = async (email: string) => {
  //   const response = await fetch('/api/users/is-registrable?email=' + email, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //
  //   if (response.ok) {
  //     const data = (await response.json()) as IsRegistrableResponseDTO;
  //     setEmailEditable(!data.isAvailable);
  //     // setErrorMessage(null);
  //   } else {
  //     console.log('toto');
  //     // setErrorMessage('Incorrect email or password');
  //   }
  // };

  // useEffect(() => {
  //   if (search) {
  //     handleIsRegistrable(search);
  //   }
  // }, [search]);

  return (
    <div className='flex h-full max-w-[350px] flex-col justify-between gap-3 py-20'>
      <p className='font-semibold'>Step 1 of 3</p>
      <p className='text-2xl font-bold'>{t('register.title1')}</p>
      <p className='text-2xl font-bold'>{t('register.title2')}</p>

      <p className='my-2'>
        {t('register.desc1')}
        <br /> {t('register.desc2')}
      </p>

      <InputEmail
        id='email'
        label={t('login.email')}
        placeholder=''
        // error={formErrors.email}
        // onBlurAction={handleBlur}
      />

      <InputPassword
        id='password'
        label={t('common.password')}
        placeholder=''
        // error={formErrors.password}
        // onBlurAction={handleBlur}
      />

      <InputCheckbox id='aggreeData' label={t('register.agreeCheckbox')} />

      <button
        type='submit'
        className='min-h-10 cursor-pointer rounded-lg bg-red-600 transition-colors duration-200 disabled:bg-red-800'
      >
        {t('register.agreeAndSubmit')}
      </button>
    </div>
  );
}
