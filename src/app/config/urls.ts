import { invert } from 'lodash-es';
import { generatePath } from 'react-router-dom';

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
  KeywordsEntry = 'KeywordsEntry',
  KeywordsResults = 'KeywordsResults',
  CitationsEntry = 'CitationsEntry',
  CitationsResults = 'CitationsResults',
  DiseasesEntry = 'DiseaseEntry',
  DiseasesResults = 'DiseaseResults',
  DatabaseEntry = 'DatabaseEntry',
  DatabaseResults = 'DatabaseResults',
  LocationsEntry = 'LocationsEntry',
  LocationsResults = 'LocationsResults',
  // Tools
  Dashboard = 'Dashboard',
  Align = 'Align',
  AlignResult = 'AlignResult',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  PeptideSearch = 'PeptideSearch',
  PeptideSearchResult = 'PeptideSearchResult',
  IDMapping = 'IDMapping',
  IDMappingResult = 'IDMappingResult',
}

export const LocationToPath: Record<Location, string> = {
  [Location.Home]: '/',
  // Main data
  [Location.UniProtKBEntry]: `/${Namespace.uniprotkb}/:accession/:subPage?`,
  [Location.UniProtKBResults]: `/${Namespace.uniprotkb}`,
  [Location.UniRefEntry]: `/${Namespace.uniref}/:accession`,
  [Location.UniRefResults]: `/${Namespace.uniref}`,
  [Location.UniParcEntry]: `/${Namespace.uniparc}/:accession`,
  [Location.UniParcResults]: `/${Namespace.uniparc}`,
  [Location.ProteomesEntry]: `/${Namespace.proteomes}/:accession`,
  [Location.ProteomesResults]: `/${Namespace.proteomes}`,
  // Supporting data
  [Location.TaxonomyEntry]: `/${Namespace.taxonomy}/:accession`,
  [Location.TaxonomyResults]: `/${Namespace.taxonomy}/`,
  [Location.KeywordsEntry]: `/${Namespace.keywords}/:accession`,
  [Location.KeywordsResults]: `/${Namespace.keywords}/`,
  [Location.CitationsEntry]: `/${Namespace.citations}/:accession`,
  [Location.CitationsResults]: `/${Namespace.citations}/`,
  [Location.DiseasesEntry]: `/${Namespace.diseases}/:accession`,
  [Location.DiseasesResults]: `/${Namespace.diseases}/`,
  [Location.DatabaseEntry]: `/${Namespace.database}/:accession`,
  [Location.DatabaseResults]: `/${Namespace.database}/`,
  [Location.LocationsEntry]: `/${Namespace.locations}/:accession`,
  [Location.LocationsResults]: `/${Namespace.locations}/`,
  // Tools
  [Location.Dashboard]: '/tool-dashboard',
  [Location.AlignResult]: '/align/:id/:subPage?',
  [Location.Align]: '/align',
  [Location.BlastResult]: '/blast/:id/:subPage?',
  [Location.Blast]: '/blast',
  [Location.PeptideSearchResult]: '/peptide-search/:id/:subPage?',
  [Location.PeptideSearch]: '/peptide-search',
  // TODO: check final URL for those
  [Location.IDMappingResult]: '/idmapping/:id/:subPage?',
  [Location.IDMapping]: '/idmapping',
};

export const SearchResultsLocations: Record<Namespace, string> = {
  // Main data
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBResults],
  [Namespace.uniref]: LocationToPath[Location.UniRefResults],
  [Namespace.uniparc]: LocationToPath[Location.UniParcResults],
  [Namespace.proteomes]: LocationToPath[Location.ProteomesResults],
  // Supporting data
  [Namespace.taxonomy]: LocationToPath[Location.TaxonomyResults],
  [Namespace.keywords]: LocationToPath[Location.KeywordsResults],
  [Namespace.citations]: LocationToPath[Location.CitationsResults],
  [Namespace.diseases]: LocationToPath[Location.DiseasesResults],
  [Namespace.database]: LocationToPath[Location.DatabaseResults],
  [Namespace.locations]: LocationToPath[Location.LocationsResults],
};

// All "entry" locations need to have a "accession" param in the pattern
export const EntryLocations: Record<Namespace, string> = {
  // Main data
  [Namespace.uniprotkb]: LocationToPath[Location.UniProtKBEntry],
  [Namespace.uniref]: LocationToPath[Location.UniRefEntry],
  [Namespace.uniparc]: LocationToPath[Location.UniParcEntry],
  [Namespace.proteomes]: LocationToPath[Location.ProteomesEntry],
  // Supporting data
  [Namespace.taxonomy]: LocationToPath[Location.TaxonomyEntry],
  [Namespace.keywords]: LocationToPath[Location.KeywordsEntry],
  [Namespace.citations]: LocationToPath[Location.CitationsEntry],
  [Namespace.diseases]: LocationToPath[Location.DiseasesEntry],
  [Namespace.database]: LocationToPath[Location.DatabaseEntry],
  [Namespace.locations]: LocationToPath[Location.LocationsEntry],
};

export const getEntryPath = (
  namespace: Namespace,
  accession: string | number
) => generatePath(EntryLocations[namespace], { accession: `${accession}` });

// Same than above, but curried version
export const getEntryPathFor = (namespace: Namespace) => {
  const entryLocation = EntryLocations[namespace];
  return (accession: string | number) =>
    generatePath(entryLocation, { accession: `${accession}` });
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
        result ? Location.IDMappingResult : Location.IDMapping
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
