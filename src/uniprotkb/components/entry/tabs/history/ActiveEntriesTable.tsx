import { DataTable } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../../app/config/urls';
import helper from '../../../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../../../shared/types/namespaces';
import { UniProtkbAPIModel } from '../../../../adapters/uniProtkbConverter';
import { TabLocation } from '../../../../types/entry';
import { columnConfig as similarProteinsColumnConfig } from '../../similar-proteins/SimilarProteinsTable';

const columnConfig = [
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
  ...similarProteinsColumnConfig,
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
