'use client';

import React from 'react';
import Image from 'next/image';

const HeaderSearch = () => {
  return (
    <form className="flex items-center gap-2 bg-dark-gray p-2 rounded-md border-2 border-transparent focus-within:border-light-gray">
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
