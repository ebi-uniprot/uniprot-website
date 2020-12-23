import { invert } from 'lodash-es';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import { Namespace } from '../../shared/types/namespaces';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniRefEntry = 'UniRefEntry',
  UniRefResults = 'UniRefResults',
  UniParcEntry = 'UniParcEntry',
  UniParcResults = 'UniParcResults',
  ProteomesEntry = 'ProteomesEntry',
  ProteomesResults = 'ProteomesResults',
  TaxonomyEntry = 'TaxonomyEntry',
  TaxonomyResults = 'TaxonomyResults',
  Align = 'Align',
  AlignResult = 'AlignResult',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  UploadList = 'UploadList',
  UploadListResult = 'UploadListResult',
  PeptideSearch = 'PeptideSearch',
  PeptideSearchResult = 'PeptideSearchResult',
  QueryBuilder = 'QueryBuilder',
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
  [Location.UploadListResult]: '/uploadlists/:id/:subPage?',
  [Location.UploadList]: '/uploadlists',
  [Location.PeptideSearchResult]: '/peptide-search/:id/:subPage?',
  [Location.PeptideSearch]: '/peptide-search',
  [Location.QueryBuilder]: '/query-builder/:namespace?',
  [Location.Dashboard]: '/tool-dashboard',
  [Location.UniRefEntry]: '/uniref/:accession',
  [Location.UniRefResults]: '/uniref',
  [Location.UniParcEntry]: '/uniparc/:accession',
  [Location.UniParcResults]: '/uniparc',
  [Location.ProteomesEntry]: '/proteomes/:accession',
  [Location.ProteomesResults]: '/proteomes',
  [Location.TaxonomyEntry]: '/taxonomy/:accession',
  [Location.TaxonomyResults]: '/taxonomy/',
};

export const SearchResultsLocations = {
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBResults],
  [Namespace.uniref]: LocationToPath[Location.UniRefResults],
  [Namespace.uniparc]: LocationToPath[Location.UniParcResults],
  [Namespace.proteomes]: LocationToPath[Location.ProteomesResults],
  [Namespace.taxonomy]: LocationToPath[Location.TaxonomyResults],
  [Namespace.publications]: '',
  [Namespace.keywords]: '',
};

// All "entry" locations need to have a "accession" param in the pattern
export const EntryLocations = {
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBEntry],
  [Namespace.uniref]: LocationToPath[Location.UniRefEntry],
  [Namespace.uniparc]: LocationToPath[Location.UniParcEntry],
  [Namespace.proteomes]: LocationToPath[Location.ProteomesEntry],
  [Namespace.taxonomy]: LocationToPath[Location.TaxonomyEntry],
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
      return LocationToPath[
        result ? Location.UploadListResult : Location.UploadList
      ];
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
