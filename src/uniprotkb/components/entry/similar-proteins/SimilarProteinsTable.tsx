import { FC, useMemo } from 'react';
import { DataTable, DENSITY_COMPACT, Loader, Message } from 'franklin-sites';
import { generatePath, Link } from 'react-router-dom';
import { getAccessionsURL } from '../../../../shared/config/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../types/columnTypes';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import { Location, LocationToPath } from '../../../../app/config/urls';

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
      <>
        <EntryTypeIcon entryType={row.entryType} />
        <Link
          to={generatePath(LocationToPath[Location.UniProtKBEntry], {
            accession: row.primaryAccession,
          })}
        >
          {row.primaryAccession}
        </Link>
      </>
    ),
  },
  {
    label: 'Protein name',
    name: 'protein_name',
    render: (row: UniProtkbAPIModel) =>
      row.proteinDescription?.recommendedName?.fullName.value,
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
  const memberList = useMemo(() => {
    // Remove UniParc entries
    return members.filter((member) => !member.startsWith('UPI'));
    return [];
  }, [members]);

  const membersURL = getAccessionsURL(memberList, {
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

  const { results } = data;

  return (
    <DataTable
      data={results}
      columns={columnConfig}
      getIdKey={(row: UniProtkbAPIModel) => row.primaryAccession}
      onSelect={() => null}
      density={DENSITY_COMPACT}
    />
  );
};

export default SimilarProteinsTable;
