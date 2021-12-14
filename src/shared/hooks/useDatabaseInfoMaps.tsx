import { useContext } from 'react';

import { DatabaseInfoMapsContext } from '../contexts/DatabaseInfoMaps';

import * as logging from '../utils/logging';

const useDatabaseInfoMaps = () => {
  const context = useContext(DatabaseInfoMapsContext);
  if (context === undefined) {
    logging.error(
      'useDatabaseInfoMaps must be used within a DatabaseInfoMapsProvider'
    );
  }
  return context;
};

export default useDatabaseInfoMaps;
