import React, { FC, useMemo } from 'react';

import MSAWrapper from '../../../components/MSAWrapper';

import alnClustalNum from '../../adapters/alnClustalNum';

import {
  SequenceInfo,
  ParsedSequenceAndFeatures,
} from '../../utils/useSequenceInfo';
import { AlnClustalNum } from '../../types/alignResults';

type Props = {
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
  console.log({ from, to: from + trimmed.length, length });
  return { from, to: from + trimmed.length, length };
};

const enrichParsed = (
  parsed: AlnClustalNum | null,
  sequenceInfo: SequenceInfo
) => {
  if (!parsed) {
    return null;
  }
  const { sequences } = parsed as { sequences: Partial<EnrichedSequence>[] };
  for (const info of sequenceInfo.data.values()) {
    const matchIndex = sequences.findIndex((s) => s.name === info.name);
    if (matchIndex !== -1) {
      const match = sequences[matchIndex];
      sequences[matchIndex] = {
        ...info,
        ...match,
        // not sure yet if that is needed or not
        ...getFromToLength(match.sequence),
        // or if those values are enough
        from: 1,
        to: match.sequence?.length || 0,
        length: match.sequence?.length || 0,
      };
    }
  }
  return { ...parsed, sequences } as ParsedAndEnriched;
};

const AlignResultOverview: FC<Props> = ({ data, sequenceInfo }) => {
  const clustalParsed = useMemo(() => alnClustalNum(data), [data]);

  const parsedAndEnriched = useMemo(
    () => enrichParsed(clustalParsed, sequenceInfo),
    [clustalParsed, sequenceInfo]
  );

  if (!parsedAndEnriched) {
    return null;
  }

  return (
    <MSAWrapper
      alignment={parsedAndEnriched.sequences}
      alignmentLength={parsedAndEnriched.sequences[0].sequence.length}
    />
  );
};

export default AlignResultOverview;
