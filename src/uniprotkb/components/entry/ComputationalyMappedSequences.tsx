/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { DataTable, DENSITY_COMPACT } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';

import apiUrls from '../../../shared/config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { ReviewedUnreviewed } from '../../../shared/components/entry/EntryTitle';
import { EntryType } from '../../adapters/uniProtkbConverter';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { addMessage } from '../../../messages/state/messagesActions';

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
  relatedProteins: ProteinEntryLight[];
};

const ComputationalyMappedSequences: React.FC<{ accession: string }> = ({
  accession,
}) => {
  const columns = [
    {
      label: 'Accession',
      name: 'accession',
      render: ({ accession, entryType }: ProteinEntryLight) => {
        return (
          <Link to={`/uniprotkb/${accession}`}>
            <ReviewedUnreviewed
              entryType={
                entryType.match(/TrEMBL/i)
                  ? EntryType.UNREVIEWED
                  : EntryType.REVIEWED
              }
            />
            {accession}
          </Link>
        );
      },
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
  ];

  const dispatch = useDispatch();

  const { data, loading, error } = useDataApi<GeneCentricData>(
    apiUrls.genecentric(accession)
  );

  if (error) {
    dispatch(
      addMessage({
        id: v1(),
        content: error.message,
        format: MessageFormat.POP_UP,
        level: MessageLevel.FAILURE,
      })
    );
  }

  if (loading || !data) {
    return null;
  }

  return (
    <>
      <h3>Computationally mapped potential isoform sequences</h3>
      <p>
        There are {data.relatedProteins.length} potential isoforms mapped to
        this entry
      </p>
      <div data-loader-scroll="computationaly-mapped">
        <DataTable
          getIdKey={({
            accession,
            geneName,
          }: {
            accession: string;
            geneName: string;
          }) => `${accession}_${geneName}`}
          density={DENSITY_COMPACT}
          columns={columns}
          data={data.relatedProteins}
          selectable
          scrollDataAttribute="computationaly-mapped"
        />
      </div>
    </>
  );
};

export default ComputationalyMappedSequences;
