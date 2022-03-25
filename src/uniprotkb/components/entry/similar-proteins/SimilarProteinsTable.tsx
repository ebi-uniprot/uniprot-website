import { DataTable, Loader, Message } from 'franklin-sites';
import { Link } from 'react-router-dom';

import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';

import useDataApi from '../../../../shared/hooks/useDataApi';

import { getAPIQueryUrl } from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import {
  LocationToPath,
  Location,
  getEntryPath,
} from '../../../../app/config/urls';

import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../types/columnTypes';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';

const columns = [
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
  isoforms: string[];
};

const SimilarProteinsTable = ({ cluster, isoforms }: Props) => {
  const query = `(uniref_cluster_${cluster.entryType.replace('UniRef', '')}:${
    cluster.id
  })${isoforms.map((isoform) => ` AND NOT (accession:${isoform})`).join('')}`;
  const url = getAPIQueryUrl({
    namespace: Namespace.uniprotkb,
    query,
    facets: [],
    columns,
    size: 10,
  });
  const { loading, data, error, headers } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(url);

  const total = +(headers?.['x-total-records'] || 0);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message level="failure">{error?.message}</Message>;
  }
  if (!data) {
    return null;
  }

  return (
    <>
      <DataTable
        data={data.results}
        columns={columnConfig}
        getIdKey={(row) => row.primaryAccession}
        density="compact"
      />
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${query}`,
        }}
      >
        Show all ({total}) UniProtKB entries
      </Link>
    </>
  );
};

export default SimilarProteinsTable;
