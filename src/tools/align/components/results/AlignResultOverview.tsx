import React, { FC, useMemo } from 'react';
import { Loader } from 'franklin-sites';

import AlignmentView, { View, Tool } from '../../../components/AlignmentView';

import alnClustalNum from '../../adapters/alnClustalNum';

import {
  SequenceInfo,
  ParsedSequenceAndFeatures,
} from '../../utils/useSequenceInfo';
import { AlnClustalNum } from '../../types/alignResults';
import { removeFeaturesWithUnknownModifier } from '../../../utils/sequences';

type AlignResultOverviewProps = {
  data: string;
  sequenceInfo: SequenceInfo;
  selectedEntries: string[];
  handleSelectedEntries: (rowId: string) => void;
};

type EnrichedSequence = AlnClustalNum['sequences'][0] &
  ParsedSequenceAndFeatures & { from: number; to: number; length: number };
type ParsedAndEnriched = {
  conservation: AlnClustalNum['conservation'];
  sequences: EnrichedSequence[];
};

const dashesRE = {
  start: /^-*/,
  end: /-*$/,
  any: /-*/g,
};
// calculate start and end of alignments without initial and final dashes
const getFromToLength = (clustalSeq = '') => {
  const trimmedStart = clustalSeq.replace(dashesRE.start, '');
  const from = clustalSeq.length - trimmedStart.length + 1;
  const trimmed = trimmedStart.replace(dashesRE.end, '');
  const { length } = trimmed.replace(dashesRE.any, '');
  return { from, to: from + trimmed.length, length };
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
      info = nameToSequenceInfo[sequence.name];
      features = removeFeaturesWithUnknownModifier(info?.features);
    }
    sequences[index] = {
      ...info,
      features: features ?? [],
      ...sequence,
      // not sure yet if that is needed or not
      ...getFromToLength(sequence.sequence),
      // or if those values are enough
      from: 1,
      to: sequence.sequence?.length || 0,
      length: sequence.sequence?.length || 0,
    };
  }
  return { ...parsed, sequences } as ParsedAndEnriched;
};

const AlignResultOverview: FC<AlignResultOverviewProps> = ({
  data,
  sequenceInfo,
  selectedEntries,
  handleSelectedEntries,
}) => {
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
      handleSelectedEntries={handleSelectedEntries}
    />
  );
};

export default AlignResultOverview;
