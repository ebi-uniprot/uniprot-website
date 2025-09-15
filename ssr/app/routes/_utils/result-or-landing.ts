import { redirect } from 'react-router';

export const isLandingPageLoader = (
  request: Request,
  redirectToSearch = false
): [isLandingPage: boolean, urlSearchParams: URLSearchParams] => {
  const sp = new URL(request.url).searchParams;

  // If there is a query is the URL
  if (sp.has('query')) {
    // ...and the query has a value
    if (sp.get('query')) {
      return [false, sp];
    }
    // otherwise, if empty query value, redirect to star search
    throw redirect('?query=*');
  }
  // If no query at all, this is a landing page, but first
  // If redirectToSearch, it's because there is no landing page implemented
  if (redirectToSearch) {
    throw redirect('?query=*');
  }

  return [true, sp];
};
