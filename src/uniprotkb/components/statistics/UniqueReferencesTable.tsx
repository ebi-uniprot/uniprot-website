import AbstractSectionTable from './AbstractSectionTable';
import { type TableProps } from './StatisticsPage';
import { mergeToMap } from './utils';

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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          data: map.get('UNIQUE_CITATION_ID')!,
          accessor: 'count',
        },
      ]}
      excludeUniProtKB
    />
  );
};

export default UniqueReferencesTable;
