import { matchPath } from 'react-router-dom';
import queryString from 'query-string';

import { LocationToPath } from '../../app/config/urls';

export const getLocationForPathname = (pathname: string) => {
  const found = Object.entries(LocationToPath).find(([, path]) =>
    matchPath(pathname, { path, exact: path === '/' })
  );
  return found?.[0];
};

/**
Wrapper around query-string's parse function which takes the output of this and
returns only the first value of a parameter if it is an array.

@param query - The query string to parse.
@param options - Options to pass query-string's parse 
*/
export const parseQueryString = (
  query: string,
  options?: queryString.ParseOptions
) => {
  const parsed = queryString.parse(query, options);
  const parsedWithoutArrayValues: { [key: string]: string | null } = {};
  for (const [key, value] of Object.entries(parsed)) {
    parsedWithoutArrayValues[key] = Array.isArray(value) ? value[0] : value;
  }
  return parsedWithoutArrayValues;
};
