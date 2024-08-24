'use server';

import { revalidatePath } from 'next/cache';
import { customFetch, getActiveUser } from '../helpers/auth';
import { IAddComment } from './types';
import { TVote } from '../components/PostOverview/PostActions';

export interface ICreatePostRequest {
  html_content: string;
  categoryIds: number[];
  title: string;
  summary: string;
  coverImagePath?: string;
}

export interface IEditPostRequest {
  id: number;
  html_content: string;
  categoryIds: number[];
  title: string;
  summary: string;
  coverImagePath?: string;
}

export async function addComment(args: IAddComment) {
  'use server';
  const activeUser = getActiveUser();

  if (!activeUser) throw new Error('User not logged in');
  customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/analytics/post-comment/${args.post_id}`
  );
  await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/add-comment`, {
    body: JSON.stringify({
      comment: args.comment,
      post_id: args.post_id,
      user_id: activeUser.id,
    }),
    method: 'POST',
  });
}

export async function createPost(props: ICreatePostRequest) {
  'use server';

  try {
    const activeUser = getActiveUser();
    if (activeUser?.id) {
      await customFetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          post: {
            html_content: props.html_content,
            summary: props.summary,
            title: props.title,
            post_categories: {
              create: props.categoryIds.map((categoryId) => ({
                categories: {
                  connect: {
                    id: categoryId,
                  },
                },
              })),
            },
            users_id: activeUser.id,
            cover_image: props.coverImagePath,
          },
        }),
      });
    }
    revalidatePath('/');
    revalidatePath('/posts');
  } catch (error) {
    console.error('ERROR CREATING POST');
    console.error(error);
  }
}

export async function editPost(props: IEditPostRequest) {
  'use server';

  try {
    const activeUser = getActiveUser();
    if (activeUser?.id) {
      await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            post: {
              id: props.id,
              html_content: props.html_content,
              summary: props.summary,
              title: props.title,
              post_categories: {
                create: props.categoryIds.map((categoryId) => ({
                  categories: {
                    connect: {
                      id: categoryId,
                    },
                  },
                })),
              },
              users_id: activeUser.id,
              cover_image: props.coverImagePath,
            },
          }),
        }
      );
    }
    revalidatePath('/');
    revalidatePath('/posts');
  } catch (error) {
    console.error('ERROR CREATING POST');
    console.error(error);
  }
}

export async function deletePost(postId: number) {
  'use server';
  const activeUser = getActiveUser();
  if (!activeUser) throw new Error('User not logged in');
  return await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
    {
      method: 'DELETE',
    }
  );
}

export async function handleVote(vote: TVote, activeUser: any, post: any) {
  try {
    if (activeUser && post) {
      if (vote === null) {
        const removedVoteRes = await customFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/remove-vote`,
          {
            method: 'DELETE',
            body: JSON.stringify({
              post_id: post.id,
              user_id: activeUser.id,
            }),
          }
        );
        const removedVote = await removedVoteRes.json();
        return removedVote;
      }
      if (vote === 'up') {
        customFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/analytics/post-like/${post.id}`
        );
      }
      const updatedVoteRes = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/update-vote`,
        {
          method: 'POST',
          body: JSON.stringify({
            vote,
            post_id: post.id,
            user_id: activeUser.id,
          }),
        }
      );
      const updatedVote = await updatedVoteRes.json();
      return updatedVote;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
