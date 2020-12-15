import { FC } from 'react';
import { Card, Sequence } from 'franklin-sites';

import { formatLargeNumber, hasContent } from '../../utils/utils';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../uniref/types/entrySection';

export type Sequence = {
  value: string;
  length: number;
  molWeight: number;
  crc64: string;
  md5: string;
};

const SequenceSection: FC<{
  data: Sequence;
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
