import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../components/error-pages/ErrorHandler';

import useDataApi from '../hooks/useDataApi';

import {
  DatabaseInfoMaps,
  getDatabaseInfoMaps,
  getDatabaseNameFromColumn,
  isDatabaseColumn,
} from '../../uniprotkb/utils/database';
import apiUrls from '../config/apiUrls';
import * as logging from '../utils/logging';

import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import { DatabaseInfo } from '../../uniprotkb/types/databaseRefs';

export const DatabaseInfoMapsContext = createContext<DatabaseInfoMaps | null>(
  null
);

export const databaseInfoColumnsSanityCheck = (databaseInfo: DatabaseInfo) => {
  const definedColumns = new Set<string>();
  Object.values(UniProtKBColumn).forEach((column) => {
    if (isDatabaseColumn(column)) {
      definedColumns.add(getDatabaseNameFromColumn(column));
    }
  });
  databaseInfo.forEach((databaseInfoPoint) => {
    // "implicit" are constructed from other properties
    if (!databaseInfoPoint.implicit) {
      const removed = definedColumns.delete(
        databaseInfoPoint.name.toLowerCase()
      );
      if (!removed) {
        logging.warn(`Missing column definition for ${databaseInfoPoint.name}`);
      }
    }
  });
  if (definedColumns.size > 0) {
    logging.warn(
      `Unused column definition for ${Array.from(definedColumns).join(', ')}`
    );
  }
};

type DatabaseInfoMapsProviderProps = {
  children: ReactNode;
};

export const DatabaseInfoMapsProvider = ({
  children,
}: DatabaseInfoMapsProviderProps) => {
  const { data, loading, progress, error, status } = useDataApi<DatabaseInfo>(
    apiUrls.allDatabases(Namespace.uniprotkb)
  );
  const databaseInfoMaps = useMemo(
    () => data && getDatabaseInfoMaps(data),
    [data]
  );

  useEffect(() => {
    // Sanity check for dynamic database info and static column definition
    if (process.env.NODE_ENV === 'development' && data) {
      databaseInfoColumnsSanityCheck(data);
    }
  }, [data]);

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !databaseInfoMaps) {
    return <ErrorHandler status={status} />;
  }

  return (
    <DatabaseInfoMapsContext.Provider value={databaseInfoMaps}>
      {children}
    </DatabaseInfoMapsContext.Provider>
  );
};
