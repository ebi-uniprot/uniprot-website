/* Results as given by the server */
import { ServerParameters } from './idMappingServerParameters';

import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';

export type MappingAPIModel = MappingWarningsErrors & {
  from: string;
  to: string | UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
  failedIds?: string[];
};

export type MappingWarningsErrors = {
  warnings?: MappingWarning[];
  errors?: MappingError[];
};

export enum MappingWarningCode {
  FiltersDisabled = 20,
  EnrichmentDisabled = 21,
}

export type MappingWarning = {
  code: MappingWarningCode;
  message: string;
};

export enum MappingErrorCode {
  TooManyTo = 40,
  Other = 50,
}

type MappingError = {
  code: MappingErrorCode;
  message: string;
};

export type MappingDetails = ServerParameters &
  MappingWarningsErrors & {
    redirectURL?: string;
    warnings?: MappingWarning[];
    errors?: MappingError[];
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
