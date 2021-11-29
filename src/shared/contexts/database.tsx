import { createContext, useContext, ReactNode, useMemo } from 'react';
import { DatabaseInfo } from '../../uniprotkb/types/databaseRefs';
import {
  DatabaseInfoMaps,
  getDatabaseInfoMaps,
} from '../../uniprotkb/utils/database';
import apiUrls from '../config/apiUrls';
import useDataApi from '../hooks/useDataApi';
import * as logging from '../utils/logging';

const DBMapsContext = createContext<DatabaseInfoMaps | null>(null);

type DBMapsProviderProps = {
  children: ReactNode;
};

export const DBMapsProvider = ({ children }: DBMapsProviderProps) => {
  const { data } = useDataApi<DatabaseInfo>(apiUrls.allUniProtKBDatabases);

  const databaseMaps = useMemo(
    () => (data ? getDatabaseInfoMaps(data) : data),
    [data]
  );

  return databaseMaps ? (
    <DBMapsContext.Provider value={databaseMaps}>
      {children}
    </DBMapsContext.Provider>
  ) : null;
};

export const useDBMaps = () => {
  const context = useContext(DBMapsContext);
  if (context === undefined) {
    logging.error('useDBMaps must be used within a CountProvider');
  }
  return context;
};
