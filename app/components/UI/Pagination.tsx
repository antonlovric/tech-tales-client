'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

interface IPagination {
  numberOfPages: number;
  selectedPage: number;
  updatePageNumber?: (page: number) => void;
}

const Pagination = (props: IPagination) => {
  const [_, setTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();
  const numberOfPagesArray = new Array(props.numberOfPages || 0).fill(0);

  function selectPage(
    selectedPageElement: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const selectedPage =
      selectedPageElement.target.getAttribute('data-page-value');
    if (props.updatePageNumber) {
      props.updatePageNumber(selectedPage);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set('activePage', selectedPage);
      setTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }
  }
  return (
    <div className="flex items-center gap-2">
      {numberOfPagesArray.map((_, i) => (
        <div
          className={`cursor-pointer border border-blog-blue px-4 py-2 rounded-md mt-2 ${
            props.selectedPage === i + 1 && 'bg-blog-blue'
          }`}
          onClick={selectPage}
          data-page-value={i + 1}
          key={i}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
