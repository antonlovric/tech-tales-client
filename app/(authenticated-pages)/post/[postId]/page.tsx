import Tooltip from '@/app/components/UI/Tooltip';
import { prisma } from '@/app/helpers/api';
import { formatDate } from '@/app/helpers/global';
import DOMPurify from 'isomorphic-dompurify';
import React from 'react';

interface IPostPage {
  params: { postId: string };
}

const Post = async ({ params }: IPostPage) => {
  const post = await prisma.posts.findFirst({
    where: { id: { equals: parseInt(params.postId) } },
    include: {
      author: true,
      post_categories: { include: { categories: true } },
    },
  });

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
        className="mb-5"
      ></div>
      <section className="flex flex-col mb-5 w-3/4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post?.author.profile_image || ''}
              alt="Author profile image"
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="flex flex-col justify-between h-full">
              <p>
                Author: {post?.author.first_name} {post?.author.last_name}
              </p>
              <p>{formatDate(post?.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="rounded-full flex items-center gap-2 border border-light-gray">
              <Tooltip tooltipText="Like">
                <button className="flex items-center justify-center p-2 cursor-pointer gap-2">
                  <span className="material-symbols-outlined">thumb_up</span>
                </button>
              </Tooltip>
              <span>0</span>
              <Tooltip tooltipText="Dislike">
                <button className="flex items-center justify-center p-2 cursor-pointer gap-2">
                  <span className="material-symbols-outlined">thumb_down</span>
                </button>
              </Tooltip>
            </div>
            <Tooltip tooltipText="Comment">
              <button className="rounded-full flex items-center gap-2 p-2 border border-light-gray">
                <span className="material-symbols-outlined">forum</span>
                <span>0</span>
              </button>
            </Tooltip>
            <Tooltip tooltipText="Share">
              <button>
                <span className="material-symbols-outlined">share</span>
              </button>
            </Tooltip>
            <Tooltip tooltipText="Report">
              <button>
                <span className="material-symbols-outlined">report</span>
              </button>
            </Tooltip>
          </div>
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
    </main>
  );
};

export default Post;
