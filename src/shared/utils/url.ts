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
  // This returns a query string by iterating over the args and creating a combined
  // URLSearchParams instance. If a parameter key already exists it will be overwritten
  // by the new value. If the new value is undefined or null then the parameter will
  // be removed. Arrays will be returned as comma separated strings.
  const combined = new URLSearchParams();
  for (const arg of args) {
    const iter =
      (typeof arg === 'string' && new URLSearchParams(arg)) ||
      (arg instanceof URLSearchParams && arg) ||
      (typeof arg !== 'undefined' && Object.entries(arg)) ||
      [];
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
  const [base, query] = url.split('?');
  return { base, query };
};
