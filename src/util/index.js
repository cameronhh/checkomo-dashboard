import { lazy } from 'react';

export const importPage = (path) => {
  return lazy(() => import(`../pages/${path}`));
};
