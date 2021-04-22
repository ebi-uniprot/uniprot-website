import { MappingAPIModel, MappingFlat } from '../types/idMappingSearchResults';

const idMappingConverter = (data: MappingAPIModel[]): MappingFlat[] =>
  data.map((row) => {
    if (typeof row.to === 'string') {
      return row;
    }
    return {
      from: row.from,
      ...row.to,
    };
  }) as MappingFlat[];

export default idMappingConverter;
