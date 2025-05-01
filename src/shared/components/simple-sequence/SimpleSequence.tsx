import { LongNumber, Sequence } from 'franklin-sites';

import { useMediumScreen } from '../../hooks/useMatchMedia';
import helper from '../../styles/helper.module.scss';
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
      title: <span data-article-id="checksum">MD5 Checksum</span>,
      content: <span className={helper['break-anywhere']}>{sequence.md5}</span>,
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
