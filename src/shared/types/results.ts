import { ReactNode } from 'react';

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
