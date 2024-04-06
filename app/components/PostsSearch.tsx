'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { FormEvent, useTransition } from 'react';

const PostsSearch = () => {
  const [isPending, setTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const searchQuery = data.get('search')?.toString();
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else params.delete('search');
    setTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form
      className="mt-4 grid grid-cols-8 w-10/12 mx-auto gap-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="search"
        placeholder="Start your journey"
        className="bg-dark-gray focus:outline-none border-blog px-3 py-2 col-span-7 rounded-md"
      />
      <button type="submit" className="button-primary">
        {isPending ? 'Loading' : 'Search'}
      </button>
    </form>
  );
};

export default PostsSearch;
