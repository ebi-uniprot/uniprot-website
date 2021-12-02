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
  const { data: databaseInfo } = useDataApi<DatabaseInfo>(
    apiUrls.allUniProtKBDatabases
  );
  const databaseInfoMaps = useMemo(
    () => databaseInfo && getDatabaseInfoMaps(databaseInfo),
    [databaseInfo]
  );

  // Sanity check for dynamic database info and static column definition
  useEffect(() => {
    if (databaseInfo) {
      const definedColumns = new Set<string>();
      Object.values(UniProtKBColumn).forEach((column) => {
        if (column.startsWith('xref_')) {
          definedColumns.add(column.replace('xref_', ''));
        }
      });
      databaseInfo.forEach((databaseInfoPoint) => {
        // "implicit" are constructed from other properties
        if (!databaseInfoPoint.implicit) {
          const removed = definedColumns.delete(
            databaseInfoPoint.name.toLowerCase()
          );
          if (!removed) {
            logging.warn(
              `Missing column definition for ${databaseInfoPoint.name}`
            );
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
  }, [databaseInfo]);

  return databaseInfoMaps ? (
    <DatabaseInfoMapsContext.Provider value={databaseInfoMaps}>
      {children}
    </DatabaseInfoMapsContext.Provider>
  ) : null;
};
