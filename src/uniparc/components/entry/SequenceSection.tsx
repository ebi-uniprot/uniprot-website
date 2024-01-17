import { FC } from 'react';
import { Card, LongNumber, Sequence } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import EntrySection from '../../types/entrySection';
import { Sequence as SequenceType } from '../../../shared/types/sequence';

const SequenceSection: FC<{
  data: SequenceType;
}> = ({ data }) => {
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
      <Sequence sequence={data.value} infoData={infoData} isCollapsible />
    </Card>
  );
};

export default SequenceSection;
