'use client';
import { categories } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';

interface IPostCategoriesFilter {
  categories: Array<categories>;
}

const PostCategoriesFilter = ({ categories }: IPostCategoriesFilter) => {
  const [isPending, setTransition] = useTransition();
  const CATEGORY_FILTER_KEY = 'categories';
  const searchParams = useSearchParams();
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<
    Array<number>
  >([]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (window) {
      const params = new URLSearchParams(window.location.search);
      const activeCategories = JSON.parse(
        decodeURIComponent(params.get(CATEGORY_FILTER_KEY) || '[]')
      );
      setActiveCategoryFilters(activeCategories);
    }
  }, [searchParams]);

  const handleFilter = (updatedCategories: number[]) => {
    const params = new URLSearchParams(window.location.search);
    if (updatedCategories.length) {
      params.set(
        CATEGORY_FILTER_KEY,
        encodeURIComponent(JSON.stringify(updatedCategories))
      );
    } else params.delete(CATEGORY_FILTER_KEY);
    setTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  function toggleCategoryFilter(targetId: number) {
    const isActive = getIsCategoryActive(targetId);
    if (isActive) {
      handleFilter(activeCategoryFilters.filter((id) => id !== targetId));
    } else handleFilter([...activeCategoryFilters, targetId]);
  }

  function getIsCategoryActive(targetId: number) {
    return activeCategoryFilters.find((categoryId) => categoryId === targetId);
  }

  function areAllFiltersActive() {
    return activeCategoryFilters.length === 0;
  }

  function resetCategoryFilters() {
    handleFilter([]);
  }

  return (
    <div className="flex items-center gap-4 flex-wrap w-full my-4">
      <span
        className={`px-3 py-2 text-sm cursor-pointer ${
          areAllFiltersActive() && 'bg-blog-blue'
        } rounded-md whitespace-nowrap `}
        onClick={() => resetCategoryFilters()}
      >
        All
      </span>
      {categories.map((category) => (
        <span
          key={category.id}
          className={`px-3 py-2 text-sm cursor-pointer ${
            getIsCategoryActive(category.id) && 'bg-blog-blue'
          } rounded-md whitespace-nowrap `}
          onClick={() => toggleCategoryFilter(category.id)}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default PostCategoriesFilter;
