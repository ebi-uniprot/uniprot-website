import { Card, LongNumber, Sequence } from 'franklin-sites';

import { useMediumScreen } from '../../../shared/hooks/useMatchMedia';

import { hasContent } from '../../../shared/utils/utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import EntrySection from '../../types/entrySection';
import { Sequence as SequenceType } from '../../../shared/types/sequence';

const SequenceSection = ({ data }: { data: SequenceType }) => {
  const mediumScreen = useMediumScreen();

  if (!hasContent(data)) {
    return null;
  }

  const infoData = [
    {
      title: 'Length',
      content: data.length,
    },
    {
      title: 'Mass (Da)',
      content: <LongNumber>{data.molWeight}</LongNumber>,
    },
    {
      title: <span data-article-id="checksum">Checksum</span>,
      content: data.crc64,
    },
  ];

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Sequence).name}</h2>}
    >
      <Sequence
        sequence={data.value}
        infoData={infoData}
        isCollapsible={
          mediumScreen ? data.value.length > 200 : data.value.length > 400
        }
      />
    </Card>
  );
};

export default SequenceSection;
