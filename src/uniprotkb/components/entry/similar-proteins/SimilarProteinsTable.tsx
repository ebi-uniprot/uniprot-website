import { DataTable, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';

import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';

import { Namespace } from '../../../../shared/types/namespaces';
import {
  LocationToPath,
  Location,
  getEntryPath,
} from '../../../../app/config/urls';

import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../types/columnTypes';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';

export const columns = [
  UniProtKBColumn.id,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.organismName,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.sequence,
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
      <Link to={getEntryPath(Namespace.uniprotkb, row.primaryAccession)}>
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
      <DataTable
        data={uniprotkbResults}
        columns={columnConfig}
        getIdKey={(row) => row.primaryAccession}
        density="compact"
      />
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${uniprotkbQuery}`,
        }}
      >
        Show all (<LongNumber>{total}</LongNumber>) UniProtKB entries
      </Link>
    </>
  );
};

export default SimilarProteinsTable;
