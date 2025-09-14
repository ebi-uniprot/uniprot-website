import { useRouteLoaderData } from 'react-router';

import { UniProtDataVersion } from '../contexts/UniProtData';

export default () => {
  const { uniProtDataVersion } =
    useRouteLoaderData<{
      uniProtDataVersion: UniProtDataVersion;
    }>('root') || {};
  if (!uniProtDataVersion) {
    throw new Error('Unexpected error');
  }
  return uniProtDataVersion;
};
