/* Results as given by the server */
import { ServerParameters } from './idMappingServerParameters';

import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';

export type MappingAPIModel = {
  from: string;
  to: string | UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
  failedIds?: string[]; // TODO handle this
};

export type MappingDetails = ServerParameters & {
  redirectURL?: string;
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
