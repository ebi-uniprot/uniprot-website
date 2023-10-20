/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AbstractSectionTable from './AbstractSectionTable';

import { mergeToMap } from './utils';

import { TableProps } from './StatisticsPage';

const UniqueReferencesTable = ({
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const map = mergeToMap(
    reviewedData.items.filter(({ name }) => name === 'UNIQUE_CITATION_ID'),
    unreviewedData.items.filter(({ name }) => name === 'UNIQUE_CITATION_ID')
  );
  return (
    <AbstractSectionTable
      caption={<>Unique references</>}
      tableData={[
        {
          header: <>Unique references</>,
          data: map.get('UNIQUE_CITATION_ID')!,
          accessor: 'count',
        },
      ]}
    />
  );
};

export default UniqueReferencesTable;
