import { cookies } from 'next/headers';

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
  const authCookie = cookies().get('auth');
  return !!authCookie?.value;
}
