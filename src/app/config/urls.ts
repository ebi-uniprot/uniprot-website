import { invert } from 'lodash-es';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import { Namespace } from '../../shared/types/namespaces';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniRefEntry = 'UniRefEntry',
  UniRefResults = 'UniRefResults',
  Align = 'Align',
  AlignResult = 'AlignResult',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  IDMap = 'IDMap',
  IDMapResult = 'IDMapResult',
  PeptideSearch = 'PeptideSearch',
  PeptideSearchResult = 'PeptideSearchResult',
  UniProtKBCustomiseTable = 'UniProtKBCustomiseTable',
  QueryBuilder = 'UniProtKBQueryBuilder',
  Dashboard = 'Dashboard',
}

export const LocationToPath = {
  [Location.Home]: '/',
  [Location.UniProtKBEntry]: '/uniprotkb/:accession/:subPage?',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.AlignResult]: '/align/:id/:subPage?',
  [Location.Align]: '/align',
  [Location.BlastResult]: '/blast/:id/:subPage?',
  [Location.Blast]: '/blast',
  [Location.IDMapResult]: '/idmap/:id/:subPage?',
  [Location.IDMap]: '/idmap',
  [Location.PeptideSearchResult]: '/peptide-search/:id/:subPage?',
  [Location.PeptideSearch]: '/peptide-search',
  [Location.UniProtKBCustomiseTable]: '/customise-table',
  [Location.QueryBuilder]: '/advanced-search/:namespace?',
  [Location.Dashboard]: '/tool-dashboard',
  [Location.UniRefEntry]: '/uniref/:accession',
  [Location.UniRefResults]: '/uniref',
};

export const SearchResultsLocations = {
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBResults],
  [Namespace.uniref]: LocationToPath[Location.UniRefResults],
  [Namespace.uniparc]: '',
  [Namespace.proteomes]: '',
  [Namespace.publications]: '',
  [Namespace.keywords]: '',
};

// eslint-disable-next-line consistent-return
export const jobTypeToPath = (type: JobTypes, result?: boolean) => {
  switch (type) {
    case JobTypes.ALIGN:
      return LocationToPath[result ? Location.AlignResult : Location.Align];
    case JobTypes.BLAST:
      return LocationToPath[result ? Location.BlastResult : Location.Blast];
    case JobTypes.IDMAP:
      return LocationToPath[result ? Location.IDMapResult : Location.IDMap];
    case JobTypes.PEPTIDE_SEARCH:
      return LocationToPath[
        result ? Location.PeptideSearchResult : Location.PeptideSearch
      ];
    default:
    //
  }
  throw new Error(`"${type}"invalid job type`);
};

export const PathToLocation = invert(LocationToPath);
