import React from 'react';
import Image from 'next/image';
import { exo } from '@/app/layout';
import { SignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const SignInPage = async () => {
  const user = await currentUser();
  if (!!user) redirect('/');

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
        />
      </div>
      <div className="flex items-center justify-center col-span-2">
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
