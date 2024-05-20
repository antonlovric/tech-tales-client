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
    include: { author: true },
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
      <section className="flex flex-col gap-5 mb-5 w-3/4 mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <div>{/* profile image */}</div>
            <div className="flex flex-col justify-between">
              <p>
                Author: {post?.author.first_name} {post?.author.last_name}
              </p>
              <p>{formatDate(post?.created_at)}</p>
            </div>
          </div>
        </div>
        <img src={post?.cover_image || ''} alt="Post cover image" />
      </section>
      <div dangerouslySetInnerHTML={{ __html: sanitizedBody }}></div>
    </main>
  );
};

export default Post;
