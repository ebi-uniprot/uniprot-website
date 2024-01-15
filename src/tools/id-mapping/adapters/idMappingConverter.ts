import { processUrlTemplate } from '../../../shared/utils/xrefs';
import { MappingAPIModel, MappingFlat } from '../types/idMappingSearchResults';

const idMappingConverter =
  (dbLink: string | null) =>
  (data: MappingAPIModel[]): MappingFlat[] =>
    data.map((row) => {
      if (typeof row.to === 'string') {
        const url = dbLink
          ? processUrlTemplate(dbLink, { id: row.to })
          : undefined;
        return {
          ...row,
          url,
        };
      }
      return {
        from: row.from,
        ...row.to,
      };
    }) as MappingFlat[];

export default idMappingConverter;
