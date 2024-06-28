import { Card } from 'franklin-sites';

import SimpleSequence from '../../../../shared/components/simple-sequence/SimpleSequence';

import { hasContent } from '../../../../shared/utils/utils';
import { getEntrySectionNameAndId } from '../../../utils/entrySection';

import EntrySection from '../../../types/entrySection';
import { Sequence as SequenceType } from '../../../../shared/types/sequence';

const SubEntrySequenceSection = ({ data }: { data: SequenceType }) => {
  if (!hasContent(data)) {
    return null;
  }

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Sequence).name}</h2>}
    >
      <SimpleSequence sequence={data} />
    </Card>
  );
};

export default SubEntrySequenceSection;
