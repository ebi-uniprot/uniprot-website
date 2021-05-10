import { Card, LongNumber, Sequence } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { Sequence as SequenceType } from '../../../shared/types/sequence';

const SequenceSection = ({ data }: { data: SequenceType }) => {
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
      title: 'Checksum',
      content: data.crc64,
    },
  ];

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Sequence).name}</h2>}
      id={EntrySection.Sequence}
    >
      <Sequence sequence={data.value} infoData={infoData} isCollapsible />
    </Card>
  );
};

export default SequenceSection;
