/* eslint-disable react/no-unused-prop-types */
import { useCallback, useMemo, useState, FC } from 'react';
import { DataTable, DENSITY_COMPACT, Message, Button } from 'franklin-sites';
import { Link, generatePath, useHistory } from 'react-router-dom';

import AddToBasket from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import BlastButton from '../../../shared/components/action-buttons/Blast';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import useDataApi from '../../../shared/hooks/useDataApi';
import apiUrls from '../../../shared/config/apiUrls';

import { Location, LocationToPath } from '../../../app/config/urls';

import { MessageLevel } from '../../../messages/types/messagesTypes';
import { Sequence } from '../../../shared/types/sequence';
import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';

type ProteinEntryLight = {
  id: string;
  sequence: Sequence;
  entryType: string;
  uniProtkbId: string;
  proteinName: string;
  organism: OrganismData;
  geneName: string;
  proteinExistence: string;
  flagType: string;
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
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const columns = useMemo<Array<
    label: string;
    name: string;
    render: (data: ProteinEntryLight) => ReactNode;
  >>(
    () => [
      {
        label: 'Entry',
        name: 'accession',
        render: ({ id: accession, entryType }: ProteinEntryLight) => (
          <Link
            to={generatePath(LocationToPath[Location.UniProtKBEntry], {
              accession,
            })}
          >
            <EntryTypeIcon entryType={entryType} />
            {accession}
          </Link>
        ),
      },
      {
        label: 'Entry name',
        name: 'uniProtkbId',
        render: ({ uniProtkbId }: ProteinEntryLight) => uniProtkbId,
      },
      {
        label: 'Gene name',
        name: 'gene_name',
        render: ({ geneName }: ProteinEntryLight) => geneName,
      },
      {
        label: 'Length',
        name: 'length',
        render: ({ sequence }: ProteinEntryLight) => sequence.length,
      },
    ],
    []
  );

  // Hooks
  const history = useHistory();
  const { data, loading, error, status } = useDataApi<GeneCentricData>(
    apiUrls.genecentric(primaryAccession)
  );

  // Note: this function is duplicated in ResultsContainer.tsx
  const handleSelectedEntries = useCallback((rowId: string) => {
    setSelectedEntries((selectedEntries) => {
      const filtered = selectedEntries.filter((id) => id !== rowId);
      return filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered;
    });
  }, []);

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
            There {filteredData.length === 1 ? 'is' : 'are'}{' '}
            {filteredData.length} potential isoform
            {filteredData.length === 1 ? '' : 's'} mapped to this entry
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
                getIdKey={({ id }: { id: string }) => id}
                density={DENSITY_COMPACT}
                columns={columns}
                data={filteredData}
                selectable
                selected={selectedEntries}
                onSelect={handleSelectedEntries}
                hasMoreData={false}
              />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ComputationalyMappedSequences;
