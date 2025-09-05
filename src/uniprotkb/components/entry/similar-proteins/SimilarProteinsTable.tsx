import { DataTable, LongNumber } from 'franklin-sites';
import { Link } from 'react-router';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../../app/config/urls';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import helper from '../../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../../shared/types/namespaces';
import { stringifyQuery } from '../../../../shared/utils/url';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../types/columnTypes';
import { TabLocation } from '../../../types/entry';

export const columns = [
  UniProtKBColumn.id,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.organismName,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.length,
];

const columnConfig = [
  {
    label: '',
    name: 'reviewed',
    render: (row: UniProtkbAPIModel) => (
      <EntryTypeIcon entryType={row.entryType} />
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

type Props = {
  cluster: UniRefLiteAPIModel;
  total: number;
  uniprotkbResults: UniProtkbAPIModel[];
  uniprotkbQuery: string;
};

const SimilarProteinsTable = ({
  cluster,
  total,
  uniprotkbResults,
  uniprotkbQuery,
}: Props) => {
  const unirefEntryUrl = getEntryPath(Namespace.uniref, cluster.id);

  return (
    <>
      <Link to={unirefEntryUrl}>{cluster.id}</Link>
      <div className={helper['overflow-y-container']}>
        <DataTable
          data={uniprotkbResults}
          columns={columnConfig}
          getIdKey={(row) => row.primaryAccession}
          density="compact"
        />
      </div>
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: stringifyQuery({ query: uniprotkbQuery }),
        }}
      >
        {'View '}
        {(total === 1 && 'this entry') || (
          <>
            {`${total === uniprotkbResults.length ? 'these' : 'all'} `}
            <LongNumber>{total}</LongNumber> entries
          </>
        )}
        {' in UniProtKB'}
      </Link>
    </>
  );
};

export default SimilarProteinsTable;
