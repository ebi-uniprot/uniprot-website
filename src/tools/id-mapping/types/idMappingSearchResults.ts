/* Results as given by the server */
import { ServerParameters } from './idMappingServerParameters';

import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';

export type MappingAPIModel = {
  from: string;
  to: string | UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
  failedIds?: string[];
};

export enum MappingWarningCode {
  FiltersDisabled = 20,
  EnrichmentDisabled = 21,
}

export enum MappingErrorCode {
  TooManyTo = 40,
  Other = 50,
}

type MappingError = {
  code: MappingWarningCode | MappingErrorCode;
  message: string;
};

export type MappingDetails = ServerParameters & {
  redirectURL?: string;
  errors?: MappingError[];
};

export type IDMappingSearchResults = {
  results: MappingAPIModel[];
};

export type MappingTo = {
  to: string;
  url?: string;
};

export type MappingFrom = {
  from: string;
};

// Should this be a subset of APIMode, and if so how do we handle it in usePagination?
export type MappingFlat = (
  | UniProtkbAPIModel
  | UniRefLiteAPIModel
  | UniParcAPIModel
  | MappingTo
) &
  MappingFrom;
