import React from 'react';
import { formatDate } from '../helpers/global';
import DOMPurify from 'isomorphic-dompurify';
import ProfileImage from './UI/ProfileImage';
import Image from 'next/image';
import { customFetch } from '../helpers/auth';

const FeaturedPost = async () => {
  const relevantPostRes = await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/analytics/relevant_post`,
    {
      method: 'GET',
    }
  );

  const relevantPost = relevantPostRes.ok ? await relevantPostRes.json() : null;
  if (!relevantPost) return <></>;
  const sanitizedTitle = DOMPurify.sanitize(relevantPost.title || '');
  const sanitizedSummary = DOMPurify.sanitize(relevantPost.summary || '');

  return (
    <article className="grid grid-cols-2 gap-x-8 w-5/6 mx-auto mt-10">
      <Image
        alt="Blog image"
        src={relevantPost.cover_image || ''}
        height={500}
        width={750}
        className="border-2 border-blog-blue rounded-md h-[400px] w-[650px] object-cover"
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {relevantPost.post_categories.map((category) => (
              <span
                key={category.categories.id}
                className="bg-blog-blue px-2 py-1 rounded-md"
              >
                {category.categories.name}
              </span>
            ))}
          </div>
          <div>
            <div
              className="text-subheading font-semibold"
              dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
            ></div>
            <div
              className="font-light text-xl text-justify mt-4"
              dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
            ></div>
          </div>
        </div>
        <div className="flex font-extralight text-lg justify-between items-center">
          <div className="flex items-center justify-between gap-2">
            <div className="h-[40px] w-[40px]">
              <ProfileImage imagePath={relevantPost.author.profile_image} />
            </div>
            <p>
              by {relevantPost.author.first_name}{' '}
              {relevantPost.author.last_name}
            </p>
          </div>
          <p> {formatDate(relevantPost.created_at)}</p>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
