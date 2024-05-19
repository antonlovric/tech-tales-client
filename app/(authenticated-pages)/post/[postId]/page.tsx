import { prisma } from '@/app/helpers/api';
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
    <main className="flex flex-col gap-3">
      <div
        className="text-xl text-center"
        dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
      ></div>
      <div className="flex justify-center flex-col items-center w-[600px] mx-auto">
        <img src={post?.cover_image || ''} alt="Post Cover Image" width={600} />
        <div className="flex items-center gap-2 justify-end w-full">
          <p>
            {post?.author.first_name} {post?.author.last_name}
          </p>
        </div>
      </div>
      <div
        className="mb-5"
        dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
      ></div>
      <div dangerouslySetInnerHTML={{ __html: sanitizedBody }}></div>
    </main>
  );
};

export default Post;
