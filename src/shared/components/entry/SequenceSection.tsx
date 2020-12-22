import { FC } from 'react';
import { Card, Sequence } from 'franklin-sites';

import { Sequence as SequenceType } from '../../types/sequence';
import { formatLargeNumber, hasContent } from '../../utils/utils';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../uniref/types/entrySection';

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
      content: formatLargeNumber(data.molWeight),
    },
    {
      title: 'Checksum',
      content: data.crc64,
    },
  ];

  return (
    <div id={EntrySection.Sequence}>
      <Card title={getEntrySectionNameAndId(EntrySection.Sequence).name}>
        <Sequence sequence={data.value} infoData={infoData} isCollapsible />
      </Card>
    </div>
  );
};

export default SequenceSection;
