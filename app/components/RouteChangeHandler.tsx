'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

interface IRouteChangeHandler {
  action?: () => any;
}

const RouteChangeHandler = ({ action }: IRouteChangeHandler) => {
  const pagePath = usePathname();

  useEffect(() => {
    console.log('PATH CHANGE');
    console.log(pagePath);
    action();
  }, [pagePath]);

  return <></>;
};

export default RouteChangeHandler;
