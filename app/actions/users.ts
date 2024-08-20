'use server';

import { users } from '@prisma/client';
import { customFetch, setAccessToken, setRefreshToken } from '../helpers/auth';
import { revalidatePath } from 'next/cache';
import { hash } from 'argon2';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { IUserSignInForm } from '../components/SignInForm';
import { sendEmail } from '../lib/mail';
import { redirect } from 'next/navigation';
import { IUserSignUpForm } from '../components/SignUpForm';

export async function editUser(userId: number, user: Partial<users>) {
  return customFetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ user }),
  });
}

export async function saveProfileImage(
  profileImageUrl: string,
  userId?: number
) {
  if (!userId) throw new Error('Invalid id');
  return await editUser(userId, {
    profile_image: profileImageUrl,
  });
}

export async function saveProfileBio(bio: string, userId?: number) {
  if (!userId) throw new Error('Invalid id');
  return await editUser(userId, {
    bio,
  });
}

export async function updateUserProfile(formData: FormData) {
  try {
    const profileInfo = {
      first_name: formData.get('firstName')?.toString(),
      last_name: formData.get('lastName')?.toString(),
      bio: formData.get('bio')?.toString(),
      location: formData.get('location')?.toString(),
      phone_number: formData.get('phoneNumber')?.toString(),
    };
    const userId = formData.get('id')?.toString();
    if (!userId)
      throw new Error('No user id provided to update profile action');

    await editUser(parseInt(userId), {
      ...profileInfo,
    });
    revalidatePath(`profile/${userId}`);
  } catch (error) {
    console.error(error);
  }
}

export async function handleSignUp(values: IUserSignUpForm) {
  'use server';

  const userRes = await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`,
    {
      method: 'POST',
      body: JSON.stringify({
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: await hash(values.password),
        },
      }),
    }
  );
  if (!userRes.ok) {
    throw new Error(userRes.statusText);
  }
  const user = await userRes.json();
  sendConfirmationEmail(user.email, user.id);
}

export async function sendConfirmationEmail(email: string, userId: number) {
  if (!email) throw new Error('invalid email');
  await sendEmail({
    to: email,
    subject: 'Confirm your tech tales account',
    body: `<p>Hi there! Please click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/confirm-email/${userId}" target="_blank">here</a> and confirm your Tech Tales account :)`,
  });
}

export async function confirmUserEmail(userId: string) {
  return await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/confirm/${userId}`,
    {
      method: 'POST',
    }
  );
}

export async function handleSignIn(values: IUserSignInForm) {
  try {
    const signInRes = await customFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/sign-in`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    );
    if (signInRes.status === 403) {
      throw new Error('User email not verified');
    }
    if (signInRes.status === 401) {
      throw new Error('Invalid credentials');
    }
    if (!signInRes.ok) {
      throw new Error('Error, please try again later');
    }

    const user = await signInRes.json();
    setAccessToken(user.accessToken);
    setRefreshToken(user.refreshToken);
    cookies().set('user', JSON.stringify(user), {
      expires: dayjs().add(2, 'hours').toDate(),
      path: '/',
      value: JSON.stringify(user),
    });
    redirect('/');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
