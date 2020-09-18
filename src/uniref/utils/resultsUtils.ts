import queryStringModule from 'query-string';

export type URLResultParams = {
  query: string;
};

export const getParamsFromURL = (url: string): URLResultParams => {
  const urlParams = queryStringModule.parse(url);
  const { query } = urlParams;

  return {
    query: query && typeof query === 'string' ? query : '',
  };
};
