import { generatePath, matchPath } from 'react-router-dom';
import { partial } from 'lodash-es';
import { LocationDescriptorObject } from 'history';

import {
  Namespace,
  searchableNamespaceLabels,
  SearchableNamespace,
  supportingDataNamespaces,
  supportingDataAndAANamespaces,
  namespaceAndToolsLabels,
} from '../../shared/types/namespaces';
import { databaseToNamespace } from '../../tools/blast/config/BlastFormData';

import { FormParameters as IdMappingFormParameters } from '../../tools/id-mapping/types/idMappingFormParameters';
import { FormParameters as BLASTFormParameters } from '../../tools/blast/types/blastFormParameters';
import { Job, FinishedJob } from '../../tools/types/toolsJob';
import { JobTypes } from '../../tools/types/toolsJobTypes';
import { Database } from '../../tools/blast/types/blastServerParameters';

export const IDMappingNamespaces = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
] as const;

export const basketNamespaces = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
] as const;

export const blastNamespaces = basketNamespaces;

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
  // Release Notes
  ReleaseNotesEntry = 'ReleaseNotesEntry',
  ReleaseNotesResults = 'ReleaseNotesResults',
  // Contact
  ContactGeneric = 'ContactGeneric',
  ContactUpdate = 'ContactUpdate',
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
  [Location.BlastResult]: `/blast/:namespace(${blastNamespaces.join(
    '|'
  )})/:id/:subPage?`,
  [Location.Blast]: '/blast',
  [Location.PeptideSearchResult]: '/peptide-search/:id/:subPage?',
  [Location.PeptideSearch]: '/peptide-search',
  [Location.IDMappingResult]: `/id-mapping/:namespace(${IDMappingNamespaces.join(
    '|'
  )})?/:id/:subPage?`,
  [Location.IDMapping]: '/id-mapping',
  // Help
  [Location.HelpEntry]: '/help/:accession',
  [Location.HelpResults]: '/help',
  // News
  [Location.ReleaseNotesEntry]: '/release-notes/:accession+',
  [Location.ReleaseNotesResults]: '/release-notes',
  // Contact
  [Location.ContactGeneric]: '/contact',
  [Location.ContactUpdate]: '/update',
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

export const searchLocations: Record<SearchableNamespace, string> = {
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

export const getEntryPath = (
  namespace: SearchableNamespace,
  accession: string | number,
  subPage?: string
) => {
  const acc = `${accession}`;
  // Isoform case
  if (namespace === Namespace.uniprotkb && acc.includes('-')) {
    return `${generatePath(EntryLocations[namespace], {
      accession: acc.split('-')[0],
      subPage,
    })}#${acc}`;
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
export const jobTypeToPath = (type: JobTypes, job?: Job) => {
  switch (type) {
    case JobTypes.ALIGN:
      if (!job) {
        return LocationToPath[Location.Align];
      }
      return generatePath(LocationToPath[Location.AlignResult], {
        id: (job as FinishedJob<JobTypes.ALIGN>).remoteID,
        subPage: 'overview',
      });
    case JobTypes.BLAST:
      if (!job) {
        return LocationToPath[Location.Blast];
      }
      return generatePath(LocationToPath[Location.BlastResult], {
        namespace: databaseToNamespace(
          (job.parameters as BLASTFormParameters).database
        ),
        id: (job as FinishedJob<JobTypes.BLAST>).remoteID,
        subPage: 'overview',
      });
    case JobTypes.ID_MAPPING:
      if (!job) {
        return LocationToPath[Location.IDMapping];
      }
      return generatePath(LocationToPath[Location.IDMappingResult], {
        namespace: databaseToNamespace(
          (
            job?.parameters as IdMappingFormParameters
          )?.to.toLowerCase() as Database
        ),
        id: (job as FinishedJob<JobTypes.ID_MAPPING>).remoteID,
        subPage: 'overview',
      });
    case JobTypes.PEPTIDE_SEARCH:
      if (!job) {
        return LocationToPath[Location.PeptideSearch];
      }
      return generatePath(LocationToPath[Location.PeptideSearchResult], {
        id: (job as FinishedJob<JobTypes.PEPTIDE_SEARCH>).remoteID,
        subPage: 'overview',
      });
    case JobTypes.ASYNC_DOWNLOAD:
      return null;
    // TODO: add when we want to view original results page for generated file
    default:
    //
  }
  throw new Error(`"${type}"invalid job type`);
};

export const getURLToJobWithData = (
  jobType: JobTypes,
  primaryAccession: string,
  options?: {
    start: number;
    end: number;
  }
) =>
  `${jobTypeToPath(jobType)}?ids=${primaryAccession}${
    options ? `[${options.start}-${options.end}]` : ''
  }`;

export const changePathnameOnly =
  <S = unknown>(pathname: string) =>
  (location: LocationDescriptorObject<S>) => ({
    ...location,
    pathname,
  });

export type ToolsResultsLocations =
  | Location.AlignResult
  | Location.BlastResult
  | Location.IDMappingResult
  | Location.PeptideSearchResult;

export const toolsResultsLocationToLabel: Record<
  ToolsResultsLocations,
  string
> = {
  [Location.IDMappingResult]: namespaceAndToolsLabels[Namespace.idmapping],
  [Location.AlignResult]: namespaceAndToolsLabels[JobTypes.ALIGN],
  [Location.BlastResult]: namespaceAndToolsLabels[JobTypes.BLAST],
  [Location.PeptideSearchResult]:
    namespaceAndToolsLabels[JobTypes.PEPTIDE_SEARCH],
};
const toolsResultsLocations = [
  Location.AlignResult,
  Location.BlastResult,
  Location.IDMappingResult,
  Location.PeptideSearchResult,
] as const;

export const getJobResultsLocation = (
  pathname: string
): ToolsResultsLocations | undefined =>
  toolsResultsLocations.find((location) =>
    matchPath(pathname, { path: LocationToPath[location] })
  );
