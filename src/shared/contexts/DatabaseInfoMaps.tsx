import { createContext, ReactNode, useEffect, useMemo } from 'react';

import {
  DatabaseInfoMaps,
  getDatabaseInfoMaps,
} from '../../uniprotkb/utils/database';
import apiUrls from '../config/apiUrls';
import useDataApi from '../hooks/useDataApi';
import * as logging from '../utils/logging';

import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import { DatabaseInfo } from '../../uniprotkb/types/databaseRefs';

export const DatabaseInfoMapsContext = createContext<DatabaseInfoMaps | null>(
  null
);

type DatabaseInfoMapsProviderProps = {
  children: ReactNode;
};

export const DatabaseInfoMapsProvider = ({
  children,
}: DatabaseInfoMapsProviderProps) => {
  const { data } = useDataApi<DatabaseInfo>(apiUrls.allUniProtKBDatabases);
  // Check against columnTypes enum
  // databaseInfo - columnTypes
  // columnTypes - databaseInfo
  const databaseInfoMaps = useMemo(
    () => (data ? getDatabaseInfoMaps(data) : data),
    [data]
  );

  // Sanity check for dynamic database info and static column definition
  useEffect(() => {
    if (data) {
      const definedColumns = new Set<string>();
      Object.values(UniProtKBColumn).forEach((column) => {
        if (column.startsWith('xref_')) {
          definedColumns.add(column.replace('xref_', ''));
        }
      });
      data.forEach((dbInfoMapping) => {
        // "implicit" are constructed from other properties
        if (!dbInfoMapping.implicit) {
          const removed = definedColumns.delete(
            dbInfoMapping.name.toLowerCase()
          );
          if (!removed) {
            logging.warn(`Missing column definition for ${dbInfoMapping.name}`);
          }
        }
      });
      if (definedColumns.size > 0) {
        logging.warn(
          `Unused column definition for ${Array.from(definedColumns).join(
            ', '
          )}`
        );
      }
    }
  }, [data]);

  return databaseInfoMaps ? (
    <DatabaseInfoMapsContext.Provider value={databaseInfoMaps}>
      {children}
    </DatabaseInfoMapsContext.Provider>
  ) : null;
};
