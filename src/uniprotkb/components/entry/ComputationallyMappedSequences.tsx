/* eslint-disable react/no-unused-prop-types */
import { useCallback, useMemo, FC, ReactNode } from 'react';
import { DataTable, Message, Button } from 'franklin-sites';
import { Link, useHistory } from 'react-router-dom';

import AddToBasket from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import BlastButton from '../../../shared/components/action-buttons/Blast';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import useDataApi from '../../../shared/hooks/useDataApi';
import apiUrls from '../../../shared/config/apiUrls';
import useItemSelect from '../../../shared/hooks/useItemSelect';

import { pluralise } from '../../../shared/utils/utils';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';

import { MessageLevel } from '../../../messages/types/messagesTypes';
import { Sequence } from '../../../shared/types/sequence';
import { ProteinExistence } from '../../../tools/blast/types/apiSequenceData';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

type ProteinEntryLight = {
  id: string;
  sequence: Sequence;
  entryType: string;
  uniProtkbId: string;
  proteinName: string;
  organism: TaxonomyDatum;
  geneName: string;
  proteinExistence: ProteinExistence;
  sequenceVersion: number;
};

type GeneCentricData = {
  canonicalProtein: ProteinEntryLight;
  relatedProteins?: ProteinEntryLight[];
  proteomeId: string;
};

const ComputationalyMappedSequences: FC<{ primaryAccession: string }> = ({
  primaryAccession,
}) => {
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const columns = useMemo<
    Array<{
      label: string;
      name: string;
      render: (data: ProteinEntryLight) => ReactNode;
    }>
  >(
    () => [
      {
        label: 'Entry',
        name: 'accession',
        render: ({ id: accession, entryType }) => (
          <Link to={getEntryPath(Namespace.uniprotkb, accession)}>
            <EntryTypeIcon entryType={entryType} />
            {accession}
          </Link>
        ),
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
    ],
    []
  );

  // Hooks
  const history = useHistory();
  const { data, loading, error, status } = useDataApi<GeneCentricData>(
    apiUrls.genecentric(primaryAccession)
  );

  const filteredData = useMemo(
    () =>
      data?.relatedProteins?.filter(
        ({ id }) => !id.startsWith(primaryAccession)
      ),
    [primaryAccession, data]
  );

  const handleViewAll = useCallback(() => {
    if (!filteredData) {
      return;
    }
    const queryString = filteredData
      ?.map(({ id }) => `accession:${id}`)
      .join(' OR ');
    history.push({
      pathname: LocationToPath[Location.UniProtKBResults],
      search: `query=(${queryString})`,
    });
  }, [history, filteredData]);

  if (loading) {
    return null;
  }

  if (!data?.relatedProteins || (error && status === 404)) {
    // Fail silently, this just means there's no data
    return null;
  }

  return (
    <div className="text-block">
      <h3>Computationally mapped potential isoform sequences</h3>
      {error || !filteredData ? (
        <Message level={MessageLevel.FAILURE}>
          Could not load computationally mapped sequences
          {error?.message && `: ${error.message}`}
        </Message>
      ) : (
        <>
          <p>
            There {pluralise('is', filteredData.length, 'are')}{' '}
            {filteredData.length} potential{' '}
            {pluralise('isoform', filteredData.length)} mapped to this entry
          </p>
          {filteredData.length ? (
            <>
              <div className="button-group">
                <BlastButton selectedEntries={selectedEntries} />
                <AlignButton selectedEntries={selectedEntries} />
                <AddToBasket selectedEntries={selectedEntries} />
                <Button variant="tertiary" onClick={handleViewAll}>
                  View all
                </Button>
              </div>

              <DataTable
                getIdKey={({ id }) => id}
                density="compact"
                columns={columns}
                data={filteredData}
                selected={selectedEntries}
                onSelectRow={handleEntrySelection}
              />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ComputationalyMappedSequences;
