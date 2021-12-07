import { generatePath } from 'react-router-dom';
import { partial } from 'lodash-es';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import {
  Namespace,
  searchableNamespaceLabels,
  SearchableNamespace,
  supportingDataNamespaces,
  supportingDataAndAANamespaces,
} from '../../shared/types/namespaces';
import EntrySection from '../../uniprotkb/types/entrySection';

export const IDMappingNamespaces = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
  Namespace.idmapping,
] as const;

export const basketNamespaces = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
] as const;

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
  // Annotations
  UniRuleEntry = 'UniRuleEntry',
  UniRuleResults = 'UniRuleResults',
  ARBAEntry = 'ARBAEntry',
  ARBAResults = 'ARBAResults',
  // Tools
  Basket = 'Basket',
  Dashboard = 'Dashboard',
  Align = 'Align',
  AlignResult = 'AlignResult',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  PeptideSearch = 'PeptideSearch',
  PeptideSearchResult = 'PeptideSearchResult',
  IDMapping = 'IDMapping',
  IDMappingResult = 'IDMappingResult',
  // Help
  HelpEntry = 'HelpEntry',
  HelpResults = 'HelpResults',
  Contact = 'Contact',
}

export const LocationToPath: Record<Location, string> = {
  [Location.Home]: '/',
  // Main data
  [Location.UniProtKBEntry]: `/${Namespace.uniprotkb}/:accession/:subPage?`,
  [Location.UniProtKBResults]: `/${Namespace.uniprotkb}`,
  [Location.UniRefEntry]: `/${Namespace.uniref}/:accession`,
  [Location.UniRefResults]: `/${Namespace.uniref}`,
  [Location.UniParcEntry]: `/${Namespace.uniparc}/:accession/:subPage?`,
  [Location.UniParcResults]: `/${Namespace.uniparc}`,
  [Location.ProteomesEntry]: `/${Namespace.proteomes}/:accession`,
  [Location.ProteomesResults]: `/${Namespace.proteomes}`,
  // Supporting data
  [Location.TaxonomyEntry]: `/${Namespace.taxonomy}/:accession`,
  [Location.TaxonomyResults]: `/${Namespace.taxonomy}`,
  [Location.KeywordsEntry]: `/${Namespace.keywords}/:accession`,
  [Location.KeywordsResults]: `/${Namespace.keywords}`,
  [Location.CitationsEntry]: `/${Namespace.citations}/:accession`,
  [Location.CitationsResults]: `/${Namespace.citations}`,
  [Location.DiseasesEntry]: `/${Namespace.diseases}/:accession`,
  [Location.DiseasesResults]: `/${Namespace.diseases}`,
  [Location.DatabaseEntry]: `/${Namespace.database}/:accession`,
  [Location.DatabaseResults]: `/${Namespace.database}`,
  [Location.LocationsEntry]: `/${Namespace.locations}/:accession`,
  [Location.LocationsResults]: `/${Namespace.locations}`,
  // Annotations
  [Location.UniRuleEntry]: `/${Namespace.unirule}/:accession`,
  [Location.UniRuleResults]: `/${Namespace.unirule}`,
  [Location.ARBAEntry]: `/${Namespace.arba}/:accession`,
  [Location.ARBAResults]: `/${Namespace.arba}`,
  // Tools
  [Location.Basket]: `/basket/:namespace(${basketNamespaces.join('|')})`,
  [Location.Dashboard]: '/tool-dashboard',
  [Location.AlignResult]: '/align/:id/:subPage?',
  [Location.Align]: '/align',
  [Location.BlastResult]: '/blast/:id/:subPage?',
  [Location.Blast]: '/blast',
  [Location.PeptideSearchResult]: '/peptide-search/:id/:subPage?',
  [Location.PeptideSearch]: '/peptide-search',
  [Location.IDMappingResult]: '/id-mapping/:id',
  [Location.IDMapping]: '/id-mapping',
  // Help
  [Location.HelpEntry]: '/help/:accession',
  [Location.HelpResults]: '/help',
  [Location.Contact]: '/contact',
};

export const SearchResultsLocations: Record<SearchableNamespace, string> = {
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
  // Annotations
  [Namespace.unirule]: LocationToPath[Location.UniRuleResults],
  [Namespace.arba]: LocationToPath[Location.ARBAResults],
};

// "/:namespace(uniprotkb|uniparc|........)"
export const allSearchResultLocations = `/:namespace(${Object.keys(
  searchableNamespaceLabels
).join('|')})`;

// "/:namespace(uniprotkb|uniparc|........)/:accession"
export const allEntryPages = `/:namespace(${Object.keys(
  searchableNamespaceLabels
).join('|')})/:accession`;

// same as above, but only with supporting data namespaces, and with accession
export const allSupportingDataEntryLocations = `/:namespace(${Array.from(
  supportingDataNamespaces
).join('|')})/:accession`;

// same as above, but with automatic annotations, and with accession
export const allSupportingDataAndAAEntryLocations = `/:namespace(${Array.from(
  supportingDataAndAANamespaces
).join('|')})/:accession`;

// All "entry" locations need to have a "accession" param in the pattern
export const EntryLocations: Record<SearchableNamespace, string> = {
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
  // Annotations
  [Namespace.unirule]: LocationToPath[Location.UniRuleEntry],
  [Namespace.arba]: LocationToPath[Location.ARBAEntry],
};

export const getEntryPath = (
  namespace: SearchableNamespace,
  accession: string | number,
  subPage?: string
) => {
  const acc = `${accession}`;
  if (namespace === Namespace.uniprotkb && acc.includes('-')) {
    return `${generatePath(EntryLocations[namespace], {
      accession: acc.split('-')[0],
      subPage,
    })}#${EntrySection.Sequence}`;
  }
  return generatePath(EntryLocations[namespace], {
    accession: acc,
    subPage,
  });
};

// Same as above but with partial function application
export const getEntryPathFor = (namespace: SearchableNamespace) =>
  partial(getEntryPath, namespace);

export const getLocationEntryPath = (location: Location, accession: string) =>
  generatePath(LocationToPath[location], {
    accession: `${accession}`,
  });

// Same as above but with partial function application
export const getLocationEntryPathFor = (location: Location) =>
  partial(getLocationEntryPath, location);

// eslint-disable-next-line consistent-return
export const jobTypeToPath = (type: JobTypes, result?: boolean) => {
  switch (type) {
    case JobTypes.ALIGN:
      return LocationToPath[result ? Location.AlignResult : Location.Align];
    case JobTypes.BLAST:
      return LocationToPath[result ? Location.BlastResult : Location.Blast];
    case JobTypes.ID_MAPPING:
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
