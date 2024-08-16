import React from 'react';
import Image from 'next/image';
import { exo } from '@/app/layout';
import { Metadata } from 'next';
import SignUpForm, { IUserSignUpForm } from '@/app/components/SignUpForm';
import { hash } from 'argon2';
import { redirect } from 'next/navigation';
import { customFetch } from '@/app/helpers/auth';

export const metadata: Metadata = {
  title: 'Tech Tales | Sign up',
};

const SignUpPage = () => {
  async function handleSignUp(values: IUserSignUpForm) {
    'use server';
    try {
      await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`, {
        method: 'POST',
        body: JSON.stringify({
          user: {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: await hash(values.password),
          },
        }),
      });
      redirect('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="grid grid-cols-3 relative h-screen">
      <div className="relative h-full col-span-1">
        <div className="absolute bg-black h-full w-full z-10 opacity-70"></div>
        <div
          className={`${exo.className} absolute top-1/2 -translate-y-1/2 text-center w-full z-20`}
        >
          <h1 className="text-6xl font-semibold">
            Join the Tech Tales Community
          </h1>
          <h2 className="text-4xl mt-4 font-extralight">
            Create your own tale
          </h2>
        </div>
        <Image
          alt="People standing in a room with computers"
          src={'/auth-image.jpg'}
          height={0}
          width={0}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col w-1/3 gap-4 items-center justify-center col-span-2 mx-auto my-auto bg-dark-gray h-max p-6 rounded-lg">
        <img alt="" src={'/logo-no-background.svg'} className="w-full mb-4" />
        <SignUpForm handleSignUp={handleSignUp} />
      </div>
    </main>
  );
};

export default SignUpPage;
