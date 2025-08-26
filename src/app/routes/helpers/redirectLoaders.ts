import { redirect } from 'react-router';
export const redirectToEntryRoute = {
  index: true,
  loader: () => redirect('entry', 308),
};

export const redirectToOverviewRoute = {
  index: true,
  loader: () => redirect('overview', 308),
};

export const redirectToUPKBRoute = {
  index: true,
  loader: () => redirect('uniprotkb', 308),
};
