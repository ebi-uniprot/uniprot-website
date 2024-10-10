import { FC, useMemo } from 'react';
import { Loader } from 'franklin-sites';

import AlignmentView, { View, Tool } from '../../../components/AlignmentView';

import alnClustalNum from '../../adapters/alnClustalNum';

import {
  SequenceInfo,
  ParsedSequenceAndFeatures,
} from '../../utils/useSequenceInfo';
import { AlnClustalNum, AlnClustalSequence } from '../../types/alignResults';
import { ProcessedFeature } from '../../../../shared/components/views/FeaturesView';

type AlignResultOverviewProps = {
  data: string;
  sequenceInfo: SequenceInfo;
  selectedEntries: string[];
  handleEntrySelection: (rowId: string) => void;
};

type EnrichedSequence = AlnClustalSequence & {
  accession: string;
  from: number;
  to: number;
  length: number;
  features: ProcessedFeature[];
};

type ParsedAndEnriched = {
  conservation: AlnClustalNum['conservation'];
  sequences: EnrichedSequence[];
};

const enrichParsed = (
  parsed: AlnClustalNum | null,
  sequenceInfo: SequenceInfo
) => {
  if (!parsed || sequenceInfo.loading) {
    return null;
  }
  // The keys here are the name (eg sp|P05067|A4_HUMAN) and used to quickly look up
  // if the user's alignment is present
  const nameToSequenceInfo: { [name: string]: ParsedSequenceAndFeatures } = {};
  for (const info of sequenceInfo.data.values()) {
    if (info.name) {
      nameToSequenceInfo[info.name] = info;
    }
  }
  const sequences = Array.from(parsed.sequences) as Partial<EnrichedSequence>[];
  // Iterate over all of the sequences in the alignment
  for (let index = 0; index < sequences.length; index += 1) {
    const sequence = sequences[index];
    let info;
    let features;
    if (sequence.name && nameToSequenceInfo[sequence.name]) {
      info = nameToSequenceInfo[sequence?.name];
      if (info?.features) {
        features = info.features;
      }
    }
    sequences[index] = {
      ...info,
      features: features ?? [],
      ...sequence,
      length: sequence.sequence?.length || 0,
      // The following are really BLAST specific (corresponding to hsp_query_from, hsp_query_to
      // and likewise for hit) but as we want the  alignment visualisation components to be
      // generic for both BLAST and Align output we set these values.
      from: 1,
      to: sequence.sequence?.length || 0,
    };
  }
  return { ...parsed, sequences } as ParsedAndEnriched;
};

const AlignResultOverview: FC<
  React.PropsWithChildren<AlignResultOverviewProps>
> = ({ data, sequenceInfo, selectedEntries, handleEntrySelection }) => {
  const clustalParsed = useMemo(() => alnClustalNum(data), [data]);

  const parsedAndEnriched = useMemo(
    () => enrichParsed(clustalParsed, sequenceInfo),
    [clustalParsed, sequenceInfo]
  );

  if (!parsedAndEnriched) {
    if (sequenceInfo.loading) {
      return <Loader />;
    }

    return null;
  }

  return (
    <AlignmentView
      alignment={parsedAndEnriched.sequences}
      alignmentLength={parsedAndEnriched.sequences[0].sequence.length}
      defaultView={View.wrapped}
      tool={Tool.align}
      selectedEntries={selectedEntries}
      handleEntrySelection={handleEntrySelection}
    />
  );
};

export default AlignResultOverview;
