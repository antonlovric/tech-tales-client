'use server';

import { users } from '@prisma/client';
import { prisma } from '../helpers/api';

export async function editUser(userId: number, user: Partial<users>) {
  return prisma.users.update({
    where: { id: userId },
    data: { ...user },
  });
}
