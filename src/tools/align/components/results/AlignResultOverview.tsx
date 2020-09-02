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
        ...match,
        ...info,
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
