import { processUrlTemplate } from '../../../uniprotkb/components/protein-data-views/XRefView';

import { DatabaseInfoPoint } from '../../../uniprotkb/types/databaseRefs';
import { MappingAPIModel, MappingFlat } from '../types/idMappingSearchResults';

// TODO: Some To columns not creating links (eg EMBL-GenBank-DDBJ) https://www.ebi.ac.uk/panda/jira/browse/TRM-27103
const idMappingConverter =
  (dbInfo?: DatabaseInfoPoint) =>
  (data: MappingAPIModel[]): MappingFlat[] =>
    data.map((row) => {
      if (typeof row.to === 'string') {
        const url = dbInfo?.uriLink
          ? processUrlTemplate(dbInfo.uriLink, { id: row.to })
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
