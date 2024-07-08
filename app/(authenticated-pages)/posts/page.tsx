import PostCard from '@/app/components/PostCard';
import PostCategoriesFilter from '@/app/components/PostCategoriesFilter';
import PostsSearch from '@/app/components/PostsSearch';
import { prisma } from '@/app/helpers/api';
import Link from 'next/link';
import React from 'react';

export interface ISearchParams {
  categories?: string;
  search?: string;
}

interface IPostsPage {
  searchParams: ISearchParams;
}

const Posts = async ({ searchParams }: IPostsPage) => {
  const parsedSearchQuery = decodeURIComponent(searchParams?.search || '');
  const parsedCategoriesQuery: number[] = JSON.parse(
    decodeURIComponent(searchParams?.categories || '[]')
  );
  const whereClause: any = {};
  if (parsedSearchQuery) {
    whereClause['OR'] = [
      {
        title: {
          contains: parsedSearchQuery,
          mode: 'insensitive',
        },
      },
    ];
  }

  if (parsedCategoriesQuery.length > 0) {
    whereClause['OR'] = whereClause['OR'] || [];
    whereClause['OR'].push({
      post_categories: {
        some: {
          categories_id: {
            in: parsedCategoriesQuery,
          },
        },
      },
    });
  }

  const posts = await prisma.posts.findMany({
    include: {
      author: true,
      post_categories: {
        include: {
          categories: true,
        },
      },
    },
    where: whereClause,
  });

  const categories = await prisma.categories.findMany();

  return (
    <div className="w-11/12 mx-auto">
      <div>
        <h1 className="text-center text-6xl font-semibold mb-2">Tech Tales</h1>
        <h2 className="text-center text-3xl font-extralight">
          Today&apos;s stories for tomorrow&apos;s tech
        </h2>
        <PostsSearch initialValue={parsedSearchQuery} />
      </div>
      <PostCategoriesFilter categories={categories} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-55 gap-y-8 gap-x-6">
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
