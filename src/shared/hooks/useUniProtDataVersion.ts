import { useRouteLoaderData } from 'react-router';

export default () => {
  const { uniProtDataVersion } = useRouteLoaderData('root') || {};
  if (!uniProtDataVersion) {
    throw new Error('Unexpected error');
  }
  return uniProtDataVersion;
};
