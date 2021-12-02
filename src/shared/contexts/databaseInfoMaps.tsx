import { createContext, useContext, ReactNode, useMemo } from 'react';
import { DatabaseInfo } from '../../uniprotkb/types/databaseRefs';
import {
  DatabaseInfoMaps,
  getDatabaseInfoMaps,
} from '../../uniprotkb/utils/database';
import apiUrls from '../config/apiUrls';
import useDataApi from '../hooks/useDataApi';
import * as logging from '../utils/logging';

const DatabaseInfoMapsContext = createContext<DatabaseInfoMaps | null>(null);

type DatabaseInfoMapsProviderProps = {
  children: ReactNode;
};

export const DatabaseInfoMapsProvider = ({
  children,
}: DatabaseInfoMapsProviderProps) => {
  const { data } = useDataApi<DatabaseInfo>(apiUrls.allUniProtKBDatabases);

  const databaseInfoMaps = useMemo(
    () => (data ? getDatabaseInfoMaps(data) : data),
    [data]
  );

  return databaseInfoMaps ? (
    <DatabaseInfoMapsContext.Provider value={databaseInfoMaps}>
      {children}
    </DatabaseInfoMapsContext.Provider>
  ) : null;
};

export const useDatabaseInfoMaps = () => {
  const context = useContext(DatabaseInfoMapsContext);
  if (context === undefined) {
    logging.error(
      'useDatabaseInfoMaps must be used within a DatabaseInfoMapsProvider'
    );
  }
  return context;
};
