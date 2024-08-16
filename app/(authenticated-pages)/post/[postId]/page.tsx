import PostActions, { TVote } from '@/app/components/PostOverview/PostActions';
import PostComments from '@/app/components/PostOverview/PostComments';
import { customFetch, getActiveUser } from '@/app/helpers/auth';
import { formatDate } from '@/app/helpers/global';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import React from 'react';

interface IPostPage {
  params: { postId: string; commentPage: string };
}

const Post = async ({ params }: IPostPage) => {
  const postRes = await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/post-details/${params.postId}`
  );
  const post = await postRes.json();

  if (post?.id) {
    customFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/analytics/post-visit/${params.postId}`
    );
  }
  const commentCount = await post.comments.length;

  const activeUser = getActiveUser();

  function getIsLiked() {
    if (!activeUser) return false;
    return !!post?.post_votes.find(
      (vote) => vote.user_id === activeUser?.id && vote.type === 'up'
    );
  }

  function getIsDisliked() {
    if (!activeUser) return false;
    return !!post?.post_votes.find(
      (vote) => vote.user_id === activeUser?.id && vote.type === 'down'
    );
  }

  const isLiked = getIsLiked();

  const isDisliked = getIsDisliked();

  async function handleVote(vote: TVote) {
    'use server';

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

  const sanitizedTitle = DOMPurify.sanitize(post?.title || '');
  const sanitizedSummary = DOMPurify.sanitize(post?.summary || '');
  const sanitizedBody = DOMPurify.sanitize(post?.html_content || '');

  return (
    <main className="max-w-[400px] md:max-w-[1000px] mx-auto">
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
        className="text-4xl font-semibold text-center mb-5"
      ></div>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
        className="text-xl mb-5"
      ></div>
      <section className="flex flex-col mb-5 w-3/4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/profile/${post?.author.id}`}>
              <img
                src={post?.author.profile_image || ''}
                alt="Author profile image"
                className="w-[60px] h-[60px] object-cover rounded-full"
              />
            </Link>
            <div className="flex flex-col justify-between h-full">
              <Link href={`/profile/${post?.author.id}`}>
                <p>
                  Author: {post?.author.first_name} {post?.author.last_name}
                </p>
              </Link>
              <p>{formatDate(post?.created_at)}</p>
            </div>
          </div>
          {post ? (
            <PostActions
              post={{
                ...post,
                isPostLiked: isLiked,
                isPostDisliked: isDisliked,
                commentCount,
              }}
              updateVote={handleVote}
            />
          ) : (
            <></>
          )}
        </div>
        <img
          src={post?.cover_image || ''}
          alt="Post cover image"
          className="my-2"
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined"></span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post?.post_categories.map((category) => (
            <button
              key={category.categories_id}
              className="px-3 py-2 text-sm cursor-pointer bg-blog-blue rounded-md whitespace-nowrap"
            >
              {category.categories.name}
            </button>
          ))}
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: sanitizedBody }}></div>
      <div className="mt-4">
        {post ? (
          <PostComments comments={post.comments} post_id={post.id} />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default Post;
