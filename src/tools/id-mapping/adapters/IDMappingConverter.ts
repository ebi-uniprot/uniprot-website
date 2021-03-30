import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { Mapping } from '../types/idMappingSearchResults';
import { IDMappingNamespace } from '../types/idMappingServerParameters';

const idMappingConverter = (data: Mapping[], namespace: IDMappingNamespace) =>
  data.map((row) =>
    namespace
      ? {
          from: row.from,
          ...(row.to as UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel),
        }
      : { from: row.from, to: row.to }
  );

export default idMappingConverter;
