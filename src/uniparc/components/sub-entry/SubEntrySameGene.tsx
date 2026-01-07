import { DataTable, Loader, LongNumber, Tab, Tabs } from 'franklin-sites';
import { Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import helper from '../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { stringifyQuery } from '../../../shared/utils/url';
import { type TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { columns } from '../../../uniprotkb/components/entry/similar-proteins/SimilarProteinsTable';
import { TabLocation } from '../../../uniprotkb/types/entry';

const selectRanks = (taxonomy?: TaxonomyAPIModel) => {
  // Keep only the nodes with a rank and that are not hidden
  const selectedRanks = (taxonomy?.lineage || []).filter((taxon) =>
    Boolean(taxon.rank !== 'no rank' /* && !taxon.hidden*/)
  );

  // Add the current node if it has a rank (even if it's hidden)
  if (taxonomy?.rank) {
    selectedRanks.push(taxonomy);
  }

  // Reverse the order to have closest rank first
  selectedRanks.reverse();

  return selectedRanks;
};

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
  geneName: string;
  taxonId: number;
};

const SameGeneTable = ({ geneName, taxonId }: Props) => {
  const uniprotkbQuery = `(taxonomy_id:${taxonId}) AND (gene:${geneName})`;
  const { data, loading, headers } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(
    apiUrls.search.search({
      namespace: Namespace.uniprotkb,
      query: uniprotkbQuery,
      columns,
      size: 10,
    })
  );

  const total = +headers?.['x-total-results'] || 0;

  if (loading) {
    return <Loader />;
  }

  if (!data?.results.length) {
    return (
      <em>
        No UniProtKB entry found with the same gene name within this taxon.
      </em>
    );
  }

  return (
    <>
      <div className={helper['overflow-y-container']}>
        <DataTable
          data={data.results}
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
            {`${total === data.results.length ? 'these' : 'all'} `}
            <LongNumber>{total}</LongNumber> entries
          </>
        )}
        {' in UniProtKB'}
      </Link>
    </>
  );
};

const SameGene = ({ geneName, taxonId }: Props) => {
  const { data, loading } = useDataApi<TaxonomyAPIModel>(
    apiUrls.entry.entry(`${taxonId}`, Namespace.taxonomy)
  );

  if (loading) {
    return <Loader />;
  }

  const selectedRanks = selectRanks(data);

  if (!selectedRanks.length) {
    return (
      <div>
        <em>No higher taxonomy rank available.</em>
      </div>
    );
  }

  return (
    <Tabs bordered>
      {selectedRanks.map((taxon) => (
        <Tab
          id={`${taxon.taxonId}`}
          title={`${taxon.commonName || taxon.scientificName || taxon.taxonId} (${taxon.rank})`}
          key={taxon.taxonId}
        >
          <SameGeneTable geneName={geneName} taxonId={taxon.taxonId} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default SameGene;
