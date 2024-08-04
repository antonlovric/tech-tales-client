'use server';

import { users } from '@prisma/client';
import { customFetch } from '../helpers/auth';

export async function editUser(userId: number, user: Partial<users>) {
  return customFetch(`${process.env.API_URL}/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...user }),
  });
}
