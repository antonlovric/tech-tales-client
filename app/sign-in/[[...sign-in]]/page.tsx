import React from 'react';
import { exo } from '@/app/layout';
import { Metadata } from 'next';
import SignInForm, { IUserSignInForm } from '@/app/components/SignInForm';
import { verify } from 'argon2';
import { prisma } from '@/app/helpers/api';
import { SignJWT } from 'jose';
import { HASH_ALG, getSecretKey } from '@/app/helpers/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';

export const metadata: Metadata = {
  title: 'Tech Tales | Sign in',
};

const SignInPage = async () => {
  async function handleSignIn(values: IUserSignInForm) {
    'use server';
    const user = await prisma.users.findFirst({
      where: { email: values.email },
    });
    if (!user) {
      return;
    }
    const isValidSignIn = await verify(user.password, values.password);
    if (!isValidSignIn) {
      return;
    }
    const token = await new SignJWT({
      jti: user.email,
    })
      .setProtectedHeader({ alg: HASH_ALG })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(getSecretKey());
    cookies().set('auth', token, {
      httpOnly: true,
      sameSite: true,
      value: token,
      expires: dayjs().add(2, 'hours').toDate(),
      path: '/',
    });
    cookies().set('user', JSON.stringify(user), {
      expires: dayjs().add(2, 'hours').toDate(),
      path: '/',
      value: JSON.stringify(user),
    });

    redirect('/');
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
        <img
          alt="People standing in a room with computers"
          src={'/auth-image.jpg'}
          className="h-full"
        />
      </div>
      <div className="flex items-center justify-center col-span-2">
        <SignInForm handleSignIn={handleSignIn} />
      </div>
    </main>
  );
};

export default SignInPage;
