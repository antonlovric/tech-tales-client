'use server';

import { customFetch, getActiveUser } from '../helpers/auth';
import { IAddComment } from './types';

export async function addComment(args: IAddComment) {
  'use server';
  const activeUser = getActiveUser();
  if (!activeUser) throw new Error('User not logged in');
  customFetch(`${process.env.API_URL}/analytics/post-comment/${args.post_id}`);
  await customFetch(`${process.env.API_URL}/posts/add-comment`, {
    body: JSON.stringify({
      data: {
        comment: args.comment,
        posts_id: args.post_id,
        users_id: activeUser.id,
      },
    }),
  });
}

export async function deletePost(postId: number) {
  'use server';
  const activeUser = getActiveUser();
  if (!activeUser) throw new Error('User not logged in');
  return await customFetch(`${process.env.API_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
}
