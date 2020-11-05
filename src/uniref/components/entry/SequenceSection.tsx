import React, { FC } from 'react';
import { Card, Sequence } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, { EntrySectionIDs } from '../../types/entrySection';

import { SequenceUIModel } from '../../../uniprotkb/adapters/sequenceConverter';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySectionIDs[EntrySection.Sequence]} data-entry-section>
      <Card title={EntrySection.Sequence}>
        <Sequence sequence={data.sequence.value} isCollapsible />
      </Card>
    </div>
  );
};

export default SequenceSection;
