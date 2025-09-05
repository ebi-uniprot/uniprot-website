import { useRouteLoaderData } from 'react-router';

import { DatabaseInfoMaps } from '../../uniprotkb/utils/database';

export default () => {
  const { databaseInfoMaps } =
    useRouteLoaderData<{
      databaseInfoMaps: DatabaseInfoMaps;
    }>('root') || {};
  if (!databaseInfoMaps) {
    throw new Error('Unexpected error');
  }
  return databaseInfoMaps;
};
