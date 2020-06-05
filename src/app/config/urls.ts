import { invert } from 'lodash-es';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniProtKBDownload = 'UniProtKBDownload',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  UniProtKBCustomiseTable = 'UniProtKBCustomiseTable',
  UniProtKBQueryBuilder = 'UniProtKBQueryBuilder',
  Dashboard = 'Dashboard',
}

export const LocationToPath = {
  [Location.Home]: '/',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.UniProtKBEntry]: '/uniprotkb/:accession',
  [Location.UniProtKBDownload]: '/download',
  [Location.Blast]: '/blast',
  [Location.BlastResult]: '/blast/:id',
  [Location.UniProtKBCustomiseTable]: '/customise-table',
  [Location.UniProtKBQueryBuilder]: '/advanced-search',
  [Location.Dashboard]: '/tool-dashboard',
};

export const PathToLocation = invert(LocationToPath);
