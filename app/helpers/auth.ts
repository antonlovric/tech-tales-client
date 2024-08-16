import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSecretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT Secret key is not set');
  }
  return new TextEncoder().encode(secret);
};

export const HASH_ALG = 'HS256';

export const EXPIRATION_TIME = 60 * 60 * 2;

export function getIsLoggedIn() {
  const authCookie = cookies().get('accessToken');
  return !!authCookie?.value;
}

export function getActiveUser() {
  const userCookie = cookies().get('user');
  if (!userCookie?.value) return null;
  return JSON.parse(userCookie.value);
}

export function setAccessToken(token = '') {
  cookies().set('accessToken', token, {
    httpOnly: true,
    sameSite: true,
    value: token,
    expires: dayjs().add(2, 'hours').toDate(),
    path: '/',
  });
}

export function setRefreshToken(token = '') {
  cookies().set('accessToken', token, {
    httpOnly: true,
    sameSite: true,
    value: token,
    expires: dayjs().add(7, 'days').toDate(),
    path: '/',
  });
}

export async function logout() {
  'use server';
  cookies().delete('user');
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  redirect('/');
}

export const customFetch: typeof fetch = async (url, options) => {
  const accessToken = cookies().get('accessToken')?.value || '';
  const res = await fetch(url, {
    ...options,
    headers: new Headers({
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
  if (res.status === 401) {
    const refreshToken = cookies().get('refreshToken')?.value || '';
    const tokensRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`,
      {
        method: 'POST',
        body: JSON.stringify({
          refreshToken,
        }),
      }
    );
    if (tokensRes.status === 401) {
      logout();
      return res;
    }
    const tokens = await tokensRes.json();
    if (tokens.accessToken) {
      setAccessToken(tokens.accessToken);
    }
    if (tokens.refreshToken) {
      setAccessToken(tokens.refreshToken);
    }
  }
  return res;
};
