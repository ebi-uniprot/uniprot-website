import { matchPath } from 'react-router-dom';

import { LocationToPath } from '../../app/config/urls';

export const getLocationForPathname = (pathname: string) => {
  const found = Object.entries(LocationToPath).find(([, path]) =>
    matchPath(pathname, { path, exact: path === '/' })
  );
  return found?.[0];
};

type QueryStringParamsRecord = Record<
  string,
  string | string[] | number | number[] | boolean | undefined | null
>;
export type QueryStringArg = string | QueryStringParamsRecord | URLSearchParams;

export const stringifyQuery = (...args: QueryStringArg[]) => {
  const combined = new URLSearchParams();
  for (const arg of args) {
    const iter =
      (typeof arg === 'string' && new URLSearchParams(arg)) ||
      (arg instanceof URLSearchParams && arg) ||
      Object.entries(arg);
    for (const [k, v] of iter) {
      if (typeof v !== 'undefined' && v !== null) {
        combined.set(k, v.toString());
      } else if (combined.has(k)) {
        combined.delete(k);
      }
    }
  }
  const sp = new URLSearchParams(combined);
  sp.sort();
  return sp.toString();
};

export const stringifyUrl = (url: string, ...args: QueryStringArg[]) =>
  `${url}?${stringifyQuery(...args)}`;

export const splitUrl = (url: string) => {
  const [base, searchParams] = url.split('?');
  return { base, searchParams };
};
