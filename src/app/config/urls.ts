import { invert } from 'lodash-es';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  UniProtKBCustomiseTable = 'UniProtKBCustomiseTable',
  UniProtKBQueryBuilder = 'UniProtKBQueryBuilder',
  Dashboard = 'Dashboard',
}

export const LocationToPath = {
  [Location.Home]: '/',
  [Location.UniProtKBEntry]: '/uniprotkb/:accession',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.BlastResult]: '/blast/:id/:subPage?',
  [Location.Blast]: '/blast',
  [Location.UniProtKBCustomiseTable]: '/customise-table',
  [Location.UniProtKBQueryBuilder]: '/advanced-search',
  [Location.Dashboard]: '/tool-dashboard',
};

export const PathToLocation = invert(LocationToPath);
