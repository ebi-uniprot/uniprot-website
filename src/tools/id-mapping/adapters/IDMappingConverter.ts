import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { Mapping } from '../types/idMappingSearchResults';

const IDMappingConverter = <
  T extends UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel
>(
  data: Mapping[]
): T[] => data.map((row) => ({ mappedIDs: row.from, ...(row.to as T) }));

export default IDMappingConverter;
