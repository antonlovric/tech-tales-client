import PostCard from '@/app/components/PostCard';
import PostCategoriesFilter from '@/app/components/PostCategoriesFilter';
import PostsSearch from '@/app/components/PostsSearch';
import { prisma } from '@/app/helpers/api';
import React from 'react';

const Posts = async () => {
  const posts = await prisma.posts.findMany({
    include: {
      author: true,
      post_categories: {
        include: {
          categories: true,
        },
      },
    },
  });

  const categories = await prisma.categories.findMany();

  return (
    <div className="w-11/12 mx-auto">
      <div>
        <h1 className="text-center text-6xl font-semibold mb-2">Tech Tales</h1>
        <h2 className="text-center text-3xl font-extralight">
          Today&apos;s stories for tomorrow&apos;s tech
        </h2>
        <PostsSearch />
      </div>
      <PostCategoriesFilter categories={categories} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-55">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
