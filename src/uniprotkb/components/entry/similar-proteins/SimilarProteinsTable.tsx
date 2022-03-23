import { FC } from 'react';
import { DataTable, Loader, Message } from 'franklin-sites';

import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import AccessionView from '../../../../shared/components/results/AccessionView';

import useDataApi from '../../../../shared/hooks/useDataApi';

import { getAccessionsURL } from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../types/columnTypes';

const columns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.id,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.organismName,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.sequence,
];

const columnConfig = [
  {
    label: 'Accession',
    name: 'accession',
    render: (row: UniProtkbAPIModel) => (
      <AccessionView
        id={row.primaryAccession}
        namespace={Namespace.uniprotkb}
      />
    ),
  },
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
    render: (row: UniProtkbAPIModel) =>
      row.proteinDescription?.recommendedName?.fullName.value ||
      row.proteinDescription?.submissionNames?.[0].fullName.value,
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

const SimilarProteinsTable: FC<{ members: string[] }> = ({ members }) => {
  const membersURL = getAccessionsURL(members, {
    facets: [],
    columns,
  });
  const { loading, data, error } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(membersURL);

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
    <DataTable
      data={data.results}
      columns={columnConfig}
      getIdKey={(row) => row.primaryAccession}
      density="compact"
    />
  );
};

export default SimilarProteinsTable;
