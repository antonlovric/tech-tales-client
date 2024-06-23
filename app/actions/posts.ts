'use server';

import { prisma } from '../helpers/api';
import { getActiveUser } from '../helpers/auth';
import { IAddComment } from './types';

export async function addComment(args: IAddComment) {
  'use server';
  const activeUser = getActiveUser();
  if (!activeUser) throw new Error('User not logged in');
  await prisma.comments.create({
    data: {
      comment: args.comment,
      posts_id: args.post_id,
      users_id: activeUser.id,
    },
  });
}
