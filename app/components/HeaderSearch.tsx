'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeaderSearch = () => {
  const { push } = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchInput = e.currentTarget.elements.namedItem('search');
    if (searchInput instanceof HTMLInputElement) {
      push(`/posts?search=${encodeURIComponent(searchInput.value?.trim())}`);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-dark-gray p-2 rounded-md border-2 border-transparent focus-within:border-light-gray"
    >
      <input
        type="text"
        name="search"
        placeholder="Search"
        className="bg-transparent focus:outline-none px-2"
      />
      <Image alt="search icon" src={'/search.svg'} width={27} height={27} />
    </form>
  );
};

export default HeaderSearch;
