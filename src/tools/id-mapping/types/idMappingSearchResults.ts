/* Results as given by the server */
import { APIModel } from '../../../shared/types/apiModel';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';

export type MappingAPIModel = {
  from: string;
  to: string | UniProtkbAPIModel | UniRefAPIModel | UniParcAPIModel;
};

export type IDMappingSearchResults = {
  results: MappingAPIModel[];
};

export type MappingTo = {
  to: string;
};

export type MappingFrom = {
  from: string;
};

// Should this be a subset of APIMode, and if so how do we handle it in usePagination?
export type MappingFlat = (APIModel | MappingTo) & MappingFrom;
