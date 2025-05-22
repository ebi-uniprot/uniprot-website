import { Card } from 'franklin-sites';

import SimpleSequence from '../../../shared/components/simple-sequence/SimpleSequence';
import { Sequence as SequenceType } from '../../../shared/types/sequence';
import { hasContent } from '../../../shared/utils/utils';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

const SequenceSection = ({ id, data }: { id: string; data: SequenceType }) => {
  if (!hasContent(data)) {
    return null;
  }

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Sequence).name}</h2>}
      id={EntrySection.Sequence}
    >
      <SimpleSequence accession={id} sequence={data} />
    </Card>
  );
};

export default SequenceSection;
