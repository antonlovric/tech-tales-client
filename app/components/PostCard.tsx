import { posts, users } from '@prisma/client';
import React from 'react';

interface IPostWithAuthor extends posts {
  author: users;
}

interface IPostCard {
  post: IPostWithAuthor;
}

const PostCard = ({ post }: IPostCard) => {
  return (
    <div className="border border-white rounded-md p-2">
      <img
        src={post.cover_image || ''}
        alt={post.title + ' cover image'}
        className="w-full block rounded-md"
      />
      <p className="">{post.title}</p>
      <p className="">{post.summary}</p>
      <div className="flex items-center justify-between">
        <p>
          {post.author.first_name} {post.author.last_name}
        </p>
        <p>22.10.2024.</p>
      </div>
    </div>
  );
};

export default PostCard;
