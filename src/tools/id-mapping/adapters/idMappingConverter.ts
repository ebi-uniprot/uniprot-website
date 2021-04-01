import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { Mapping, MappingFlat } from '../types/idMappingSearchResults';
import { IDMappingNamespace } from '../types/idMappingServerParameters';

const idMappingConverter = (
  data: Mapping[],
  namespace: IDMappingNamespace
): MappingFlat[] =>
  // If we have a namespace, cast and destructure appropriately
  namespace
    ? data.map((row) => ({
        from: row.from,
        ...(row.to as UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel),
      }))
    : (data as MappingFlat[]);

export default idMappingConverter;
