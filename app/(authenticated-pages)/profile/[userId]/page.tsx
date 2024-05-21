import { prisma } from '@/app/helpers/api';
import React from 'react';

interface IProfilePage {
  params: { userId: string };
}

const UserProfile = async ({ params }: IProfilePage) => {
  const profile = await prisma.users.findFirst({
    where: { id: { equals: parseInt(params.userId || '') } },
    include: { posts: true },
  });

  return <div>UserProfile</div>;
};

export default UserProfile;
