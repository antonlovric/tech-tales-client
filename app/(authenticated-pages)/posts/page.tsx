import PostCard from '@/app/components/PostCard';
import PostCategoriesFilter from '@/app/components/PostCategoriesFilter';
import PostsSearch from '@/app/components/PostsSearch';
import PageSizeSelector from '@/app/components/UI/PageSizeSelector';
import Pagination from '@/app/components/UI/Pagination';
import { customFetch } from '@/app/helpers/auth';
import Link from 'next/link';
import React from 'react';

export interface ISearchParams {
  categories?: string;
  search?: string;
  pageSize?: string;
  activePage?: string;
}

interface IPostsPage {
  searchParams: ISearchParams;
}

const Posts = async ({ searchParams }: IPostsPage) => {
  const parsedSearchQuery = decodeURIComponent(searchParams?.search || '');
  const parsedCategoriesQuery: number[] = JSON.parse(
    decodeURIComponent(searchParams?.categories || '[]')
  );
  const activePageNumber: number = parseInt(searchParams?.activePage || '1');

  const pageSize: number = parseInt(searchParams?.pageSize || '6');
  const postsRes = await customFetch(
    `${process.env.API_URL}/posts?search=${encodeURIComponent(
      parsedSearchQuery
    )}&categories=[${encodeURIComponent(
      parsedCategoriesQuery.toString()
    )}]&pageSize=${pageSize}&page=${activePageNumber}`
  );
  const postData = await postsRes.json();

  const posts = postData.posts;
  const postCount = posts.length;
  const numberOfPages = Math.ceil(postCount / pageSize);

  const categoriesRes = await customFetch(`${process.env.API_URL}/categories`);
  const categories = await categoriesRes.json();
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
      <div className="grid grid-cols-auto-fill-350 autofill:250 gap-y-8 gap-x-6">
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
      <section className="flex items-start justify-between">
        <Pagination
          selectedPage={activePageNumber}
          numberOfPages={numberOfPages}
        />
        <PageSizeSelector />
      </section>
    </div>
  );
};

export default Posts;
