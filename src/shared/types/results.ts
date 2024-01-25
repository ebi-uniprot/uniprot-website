import { ReactNode } from 'react';
import {
  SelectedFacet,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { Column } from '../config/columns';
import { Namespace } from './namespaces';
import { FileFormat } from './resultsDownload';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';

export type FacetValue<Label extends ReactNode = string> = {
  // if from API, a simple string and always there,
  // but we need to make it an optional ReactNode for the constructed facets
  label?: Label;
  value: string;
  count: number;
};

export type FacetObject<Label extends ReactNode = string> = {
  // if from API, a simple string and always there,
  // but make it an optional React node for the constructed facets
  label?: Label;
  name: string;
  allowMultipleSelection: boolean;
  values?: Array<FacetValue<Label>>;
};

export type MatchedField = {
  name: string; // name of the field to use
  hits: number;
};

export type Suggestion = {
  query: string; // full suggested query
  hits: number; // Only an estimate!
};

export enum SearchResultsWarningCode {
  WildcardDetected = 41,
}

export type SearchResultsWarning = {
  code: SearchResultsWarningCode;
  message: string;
};

export type SearchResults<Schema> = {
  facets?: Array<FacetObject>;
  results: Array<Schema>;
  matchedFields?: Array<MatchedField>;
  suggestions?: Array<Suggestion>;
  warnings?: SearchResultsWarning[];
  obsoleteCount?: number;
  // Only if there's any async issue with the payload
  error?: string;
};

export type Response<Schema> = {
  data: SearchResults<Schema>;
  headers: {
    ['x-total-results']: string;
    link: string;
  };
};

export type DownloadUrlOptions = {
  base?: string;
  query?: string;
  columns?: string[];
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  fileFormat: FileFormat;
  compressed: boolean;
  size?: number;
  selected: string[];
  selectedIdField: Column;
  namespace: Namespace;
  accessions?: string[];
  download?: boolean;
  jobId?: string; // ID Mapping Async Download
  version?: string;
};
