import PostsSearch from '@/app/components/PostsSearch';
import React from 'react';

const Posts = () => {
  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-center text-6xl font-semibold mb-2">Tech Tales</h1>
      <h2 className="text-center text-3xl font-extralight">
        Today&apos;s stories for tomorrow&apos;s tech
      </h2>
      <PostsSearch />
    </div>
  );
};

export default Posts;
