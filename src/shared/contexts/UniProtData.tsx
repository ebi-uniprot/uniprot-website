import { createContext, ReactNode, useEffect, useMemo } from 'react';

import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import { DatabaseInfo } from '../../uniprotkb/types/databaseRefs';
import {
  DatabaseInfoMaps,
  getDatabaseInfoMaps,
  getDatabaseNameFromColumn,
  isDatabaseColumn,
} from '../../uniprotkb/utils/database';
import apiUrls from '../config/apiUrls/apiUrls';
import useDataApi from '../hooks/useDataApi';
import { Namespace } from '../types/namespaces';
import * as logging from '../utils/logging';

export type UniProtDataVersion = {
  releaseNumber: string;
  releaseDate: Date;
};

export const UniProtDataVersionContext =
  createContext<UniProtDataVersion | null>(null);
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
      /* istanbul ignore if */
      if (!removed) {
        logging.warn(`Missing column definition for ${databaseInfoPoint.name}`);
      }
    }
  });
  /* istanbul ignore if */
  if (definedColumns.size > 0) {
    logging.warn(
      `Unused column definition for ${Array.from(definedColumns).join(', ')}`
    );
  }
};

export const UniProtDataProvider = ({ children }: { children: ReactNode }) => {
  const { data, headers } = useDataApi<DatabaseInfo>(
    apiUrls.configure.allDatabases(Namespace.uniprotkb)
  );

  const uniProtDataVersion = useMemo(() => {
    if (!headers) {
      return null;
    }
    return {
      releaseNumber: headers['x-uniprot-release'],
      releaseDate: new Date(headers['x-uniprot-release-date']),
    };
  }, [headers]);
  const databaseInfoMaps = useMemo(() => getDatabaseInfoMaps(data), [data]);

  useEffect(() => {
    // Sanity check for dynamic database info and static column definition
    if (process.env.NODE_ENV === 'development' && data) {
      databaseInfoColumnsSanityCheck(data);
    }
  }, [data]);

  return (
    <UniProtDataVersionContext.Provider value={uniProtDataVersion}>
      <DatabaseInfoMapsContext.Provider value={databaseInfoMaps}>
        {children}
      </DatabaseInfoMapsContext.Provider>
    </UniProtDataVersionContext.Provider>
  );
};
