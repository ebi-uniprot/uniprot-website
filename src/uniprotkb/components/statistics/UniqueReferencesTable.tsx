/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AbstractSectionTable from './AbstractSectionTable';

import { mergeToMap } from './utils';

import { TableProps } from './StatisticsPage';

const UniqueReferencesTable = ({
  uniprotkbData,
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const map = mergeToMap(
    uniprotkbData.items.filter(({ name }) => name === 'UNIQUE_CITATION_ID'),
    reviewedData.items.filter(({ name }) => name === 'UNIQUE_CITATION_ID'),
    unreviewedData.items.filter(({ name }) => name === 'UNIQUE_CITATION_ID')
  );
  return (
    <AbstractSectionTable
      title="Unique references"
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
