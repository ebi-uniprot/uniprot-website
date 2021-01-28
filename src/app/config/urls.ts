import { invert } from 'lodash-es';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import { Namespace } from '../../shared/types/namespaces';

export enum Location {
  Home = 'Home',
  // Main data
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniRefEntry = 'UniRefEntry',
  UniRefResults = 'UniRefResults',
  UniParcEntry = 'UniParcEntry',
  UniParcResults = 'UniParcResults',
  ProteomesEntry = 'ProteomesEntry',
  ProteomesResults = 'ProteomesResults',
  // Supporting data
  TaxonomyEntry = 'TaxonomyEntry',
  TaxonomyResults = 'TaxonomyResults',
  CitationsEntry = 'CitationsEntry',
  CitationsResults = 'CitationsResults',
  KeywordsEntry = 'KeywordsEntry',
  KeywordsResults = 'KeywordsResults',
  // Tools
  Dashboard = 'Dashboard',
  Align = 'Align',
  AlignResult = 'AlignResult',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  UploadList = 'UploadList',
  UploadListResult = 'UploadListResult',
  PeptideSearch = 'PeptideSearch',
  PeptideSearchResult = 'PeptideSearchResult',
}

export const LocationToPath = {
  [Location.Home]: '/',
  // Main data
  [Location.UniProtKBEntry]: '/uniprotkb/:accession/:subPage?',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.UniRefEntry]: '/uniref/:accession',
  [Location.UniRefResults]: '/uniref',
  [Location.UniParcEntry]: '/uniparc/:accession',
  [Location.UniParcResults]: '/uniparc',
  [Location.ProteomesEntry]: '/proteomes/:accession',
  [Location.ProteomesResults]: `/${Namespace.proteomes}`,
  // Supporting data
  [Location.TaxonomyEntry]: '/taxonomy/:accession',
  [Location.TaxonomyResults]: '/taxonomy/',
  [Location.CitationsEntry]: '/citations/:accession',
  [Location.CitationsResults]: '/citations/',
  [Location.KeywordsEntry]: '/keywords/:accession',
  [Location.KeywordsResults]: '/keywords/',
  // Tools
  [Location.Dashboard]: '/tool-dashboard',
  [Location.AlignResult]: '/align/:id/:subPage?',
  [Location.Align]: '/align',
  [Location.BlastResult]: '/blast/:id/:subPage?',
  [Location.Blast]: '/blast',
  [Location.UploadListResult]: '/uploadlists/:id/:subPage?',
  [Location.UploadList]: '/uploadlists',
  [Location.PeptideSearchResult]: '/peptide-search/:id/:subPage?',
  [Location.PeptideSearch]: '/peptide-search',
};

export const SearchResultsLocations = {
  // Main data
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBResults],
  [Namespace.uniref]: LocationToPath[Location.UniRefResults],
  [Namespace.uniparc]: LocationToPath[Location.UniParcResults],
  [Namespace.proteomes]: LocationToPath[Location.ProteomesResults],
  // Supporting data
  [Namespace.taxonomy]: LocationToPath[Location.TaxonomyResults],
  [Namespace.citations]: LocationToPath[Location.CitationsResults],
  [Namespace.keywords]: LocationToPath[Location.KeywordsResults],
};

// All "entry" locations need to have a "accession" param in the pattern
export const EntryLocations = {
  // Main data
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBEntry],
  [Namespace.uniref]: LocationToPath[Location.UniRefEntry],
  [Namespace.uniparc]: LocationToPath[Location.UniParcEntry],
  [Namespace.proteomes]: LocationToPath[Location.ProteomesEntry],
  // Supporting data
  [Namespace.taxonomy]: LocationToPath[Location.TaxonomyEntry],
  [Namespace.citations]: LocationToPath[Location.CitationsEntry],
  [Namespace.keywords]: LocationToPath[Location.KeywordsEntry],
};

// eslint-disable-next-line consistent-return
export const jobTypeToPath = (type: JobTypes, result?: boolean) => {
  switch (type) {
    case JobTypes.ALIGN:
      return LocationToPath[result ? Location.AlignResult : Location.Align];
    case JobTypes.BLAST:
      return LocationToPath[result ? Location.BlastResult : Location.Blast];
    case JobTypes.UPLOAD_LIST:
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
