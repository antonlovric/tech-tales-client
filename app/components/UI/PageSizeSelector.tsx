'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

interface IPageSizeSelector {
  pageSizes?: number[];
  handlePageSizeChange?: (pageSize: number) => void;
  activePageSize?: number;
}

const PageSizeSelector = (props: IPageSizeSelector) => {
  const [_, setTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();
  const pageSizes = props.pageSizes || [5, 10, 15, 20, 50];

  function selectPageSize(
    selectedPageElement: React.ChangeEvent<HTMLSelectElement>
  ) {
    const selectedPage = parseInt(selectedPageElement.target.value);
    if (props.handlePageSizeChange) {
      props.handlePageSizeChange(selectedPage);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set('pageSize', selectedPage.toString());
      params.delete('activePage');
      setTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }
  }

  return (
    <select
      className="bg-dark-gray border-light-gray border px-2 py-2 rounded-md"
      onChange={selectPageSize}
      defaultValue={props.activePageSize || pageSizes[0]}
    >
      {pageSizes.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
};

export default PageSizeSelector;
