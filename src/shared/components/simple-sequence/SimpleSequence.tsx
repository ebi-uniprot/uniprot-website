import { LongNumber, Sequence } from 'franklin-sites';

import { useMediumScreen } from '../../hooks/useMatchMedia';

import { Sequence as SequenceType } from '../../types/sequence';

const SimpleSequence = ({ sequence }: { sequence: SequenceType }) => {
  const mediumScreen = useMediumScreen();

  const infoData = [
    {
      title: 'Length',
      content: sequence.length,
    },
    {
      title: 'Mass (Da)',
      content: <LongNumber>{sequence.molWeight}</LongNumber>,
    },
    {
      title: <span data-article-id="checksum">Checksum</span>,
      content: sequence.crc64,
    },
  ];

  return (
    <Sequence
      sequence={sequence.value}
      infoData={infoData}
      isCollapsible={
        mediumScreen ? sequence.length > 200 : sequence.length > 400
      }
    />
  );
};

export default SimpleSequence;
