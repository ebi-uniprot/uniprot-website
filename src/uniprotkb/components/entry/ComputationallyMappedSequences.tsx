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

// NOTE: Jie told me this would be replaced by a different
// format he called "FASTA" entry
type ProteinEntryLight = {
  accession: string;
  entryType: string;
  sequenceLength: number;
  geneName: string;
  geneNameType: string;
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

  const columns = useMemo(
    () => [
      {
        label: 'Accession',
        name: 'accession',
        render: ({ accession, entryType }: ProteinEntryLight) => (
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
        label: 'Gene name',
        name: 'gene_name',
        render: ({ geneName }: ProteinEntryLight) => geneName,
      },
      {
        label: 'Gene name type',
        name: 'gene_name_type',
        render: ({ geneNameType }: ProteinEntryLight) => geneNameType,
      },
      {
        label: 'Length',
        name: 'length',
        render: ({ sequenceLength }: ProteinEntryLight) => sequenceLength,
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
        ({ accession, geneNameType }) =>
          geneNameType === 'Gene name' &&
          !accession.startsWith(primaryAccession)
      ),
    [primaryAccession, data]
  );

  const handleViewAll = useCallback(() => {
    if (!filteredData) {
      return;
    }
    const queryString = filteredData
      ?.map(({ accession }) => `accession:${accession}`)
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
                getIdKey={({ accession }: { accession: string }) => accession}
                density={DENSITY_COMPACT}
                columns={columns}
                data={filteredData}
                selectable
                selected={selectedEntries}
                onSelect={handleSelectedEntries}
              />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ComputationalyMappedSequences;
