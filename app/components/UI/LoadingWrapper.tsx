import React, { PropsWithChildren } from 'react';

interface ILoadingWrapper {
  isLoading?: boolean;
}

const LoadingWrapper = ({
  children,
  isLoading,
}: PropsWithChildren<ILoadingWrapper>) => {
  return isLoading ? (
    <div className="flex items-center justify-center w-full">
      <span className="loader"></span>
    </div>
  ) : (
    children
  );
};

export default LoadingWrapper;
