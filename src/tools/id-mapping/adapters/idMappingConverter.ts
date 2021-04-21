import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { MappingAPIModel, MappingFlat } from '../types/idMappingSearchResults';

const idMappingConverter = (data: MappingAPIModel[]): MappingFlat[] =>
  data.map((row) => {
    if (typeof row.to === 'string') {
      return row;
    }
    return {
      from: row.from,
      ...(row.to as UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel),
    };
  });

export default idMappingConverter;
