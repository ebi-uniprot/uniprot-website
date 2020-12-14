import { FC } from 'react';
import { Card, Sequence } from 'franklin-sites';

import { formatLargeNumber, hasContent } from '../../../shared/utils/utils';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';

import { SequenceUIModel } from '../../../uniprotkb/adapters/sequenceConverter';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data }) => {
  if (!hasContent(data)) {
    return null;
  }

  const infoData = [
    {
      title: 'Length',
      content: data.sequence.length,
    },
    {
      title: 'Mass (Da)',
      content: formatLargeNumber(data.sequence.molWeight),
    },
    {
      title: 'Checksum',
      content: data.sequence.crc64,
    },
  ];

  return (
    <div id={EntrySection.Sequence}>
      <Card title={getEntrySectionNameAndId(EntrySection.Sequence).name}>
        <Sequence
          sequence={data.sequence.value}
          infoData={infoData}
          isCollapsible
        />
      </Card>
    </div>
  );
};

export default SequenceSection;
