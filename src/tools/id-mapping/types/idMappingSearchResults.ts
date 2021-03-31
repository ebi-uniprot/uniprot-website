/* Results as given by the server */
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';

export type Mapping = {
  from: string;
  to: string | UniProtkbAPIModel | UniRefAPIModel | UniParcAPIModel;
};

export type IDMappingSearchResults = {
  results: Mapping[];
};

export type MappingTo = {
  to: string;
};

export type MappingFrom = {
  from: string;
};

export type MappingFlat = (
  | MappingTo
  | UniProtkbAPIModel
  | UniRefAPIModel
  | UniParcAPIModel
) &
  MappingFrom;
