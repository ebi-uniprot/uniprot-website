import { useMemo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, Message } from 'franklin-sites';

import AddToBasket from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';

import AccessionView from '../../../shared/components/results/AccessionView';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import useDataApi from '../../../shared/hooks/useDataApi';
import useItemSelect from '../../../shared/hooks/useItemSelect';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import { pluralise } from '../../../shared/utils/utils';
import apiUrls from '../../../shared/config/apiUrls';

import { Location, LocationToPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';

import { SearchResults } from '../../../shared/types/results';
import { Flag } from '../../adapters/sequenceConverter';
import { MessageLevel } from '../../../messages/types/messagesTypes';
import { Sequence } from '../../../shared/types/sequence';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

import helper from '../../../shared/styles/helper.module.scss';

type ProteinEntryLight = {
  id: string;
  sequence: Sequence;
  entryType: string;
  uniProtkbId: string;
  proteinName: string;
  organism: TaxonomyDatum;
  geneName: string;
  proteinExistence?: string;
  sequenceVersion?: number;
  flagType: Flag;
};

export type GeneCentricData = {
  canonicalProtein: ProteinEntryLight;
  relatedProteins?: ProteinEntryLight[];
  proteomeId: string;
};

const columns: Array<{
  label: ReactNode;
  name: string;
  render: (data: ProteinEntryLight) => ReactNode;
}> = [
  {
    label: 'Entry',
    name: 'accession',
    render: ({ id }) => (
      <AccessionView id={id} namespace={Namespace.uniprotkb} />
    ),
  },
  {
    label: null,
    name: 'reviewed',
    render: ({ entryType }) => <EntryTypeIcon entryType={entryType} />,
  },
  {
    label: 'Entry name',
    name: 'uniProtkbId',
    render: ({ uniProtkbId }) => uniProtkbId,
  },
  {
    label: 'Gene name',
    name: 'gene_name',
    render: ({ geneName }) => geneName,
  },
  {
    label: 'Length',
    name: 'length',
    render: ({ sequence }) => sequence.length,
  },
];

const ComputationalyMappedSequences = ({
  primaryAccession,
}: {
  primaryAccession: string;
}) => {
  const smallScreen = useSmallScreen();
  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect();

  // Hooks
  const { data, loading, error, status } = useDataApi<
    SearchResults<GeneCentricData>
  >(apiUrls.genecentric(primaryAccession));

  const filteredData = useMemo(
    () =>
      data?.results?.[0] &&
      [
        data.results[0].canonicalProtein,
        ...(data.results[0].relatedProteins || []),
      ]?.filter(
        ({ id }) => !(id.startsWith(primaryAccession) || id.includes('-'))
      ),
    [primaryAccession, data]
  );

  if (loading) {
    return null;
  }

  if (
    !data?.results?.[0] ||
    (error && status === 404) ||
    !filteredData?.length
  ) {
    // Fail silently, this just means there's no data
    return null;
  }

  return (
    <div className="text-block">
      <h3 data-article-id="gene_centric_isoform_mapping">
        Computationally mapped potential isoform sequences
      </h3>
      {error ? (
        <Message level={MessageLevel.FAILURE}>
          <small>
            Could not load computationally mapped sequences
            {error?.message && `: ${error.message}`}
          </small>
        </Message>
      ) : (
        <>
          <p>
            There {pluralise('is', filteredData.length, 'are')}{' '}
            {filteredData.length} potential{' '}
            {pluralise('isoform', filteredData.length)} mapped to this entry
          </p>
          <div className="button-group">
            <AlignButton selectedEntries={selectedEntries} />
            <AddToBasket selectedEntries={selectedEntries} />
            <Link
              to={{
                pathname: LocationToPath[Location.UniProtKBResults],
                search: `query=accession:${primaryAccession} OR ${filteredData
                  ?.map(({ id }) => `accession:${id}`)
                  .sort()
                  .join(' OR ')}`,
              }}
            >
              View all
            </Link>
          </div>

          <div className={helper['overflow-y-container']}>
            <DataTable
              getIdKey={({ id }) => id}
              density="compact"
              columns={columns}
              data={filteredData}
              onSelectionChange={
                smallScreen ? undefined : setSelectedItemFromEvent
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ComputationalyMappedSequences;
