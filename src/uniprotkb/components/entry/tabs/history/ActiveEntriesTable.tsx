import { DataTable } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../../app/config/urls';
import EntryTypeIcon from '../../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../../shared/components/entry/TaxonomyView';
import helper from '../../../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../../../shared/types/namespaces';
import { UniProtkbAPIModel } from '../../../../adapters/uniProtkbConverter';
import { TabLocation } from '../../../../types/entry';

const columnConfig = [
  {
    label: '',
    name: 'reviewed',
    render: (row: UniProtkbAPIModel) => (
      <EntryTypeIcon entryType={row.entryType} />
    ),
  },
  {
    label: 'Entry',
    name: 'entry',
    render: (row: UniProtkbAPIModel) => (
      <Link
        to={getEntryPath(
          Namespace.uniprotkb,
          row.primaryAccession,
          TabLocation.Entry
        )}
      >
        {row.primaryAccession}
      </Link>
    ),
  },
  {
    label: 'Protein name',
    name: 'protein_name',
    render: (row: UniProtkbAPIModel) => (
      <Link
        to={getEntryPath(
          Namespace.uniprotkb,
          row.primaryAccession,
          TabLocation.Entry
        )}
      >
        {row.proteinDescription?.recommendedName?.fullName.value ||
          row.proteinDescription?.submissionNames?.[0].fullName.value}
      </Link>
    ),
  },
  {
    label: 'Organism',
    name: 'organism',
    render: (row: UniProtkbAPIModel) =>
      row.organism && <TaxonomyView data={row.organism} />,
  },
  {
    label: 'Length',
    name: 'length',
    render: (row: UniProtkbAPIModel) => row.sequence?.length,
  },
];

const ActiveEntriesTable = ({ entries }: { entries: UniProtkbAPIModel[] }) => (
  <div className={helper['overflow-y-container']}>
    <DataTable
      data={entries}
      columns={columnConfig}
      getIdKey={(row) => row.primaryAccession}
      density="compact"
    />
  </div>
);

export default ActiveEntriesTable;
