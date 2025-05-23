import { Card } from 'franklin-sites';

import CommonSequenceView from '../../../shared/components/common-sequence/CommonSequenceSection';
import { Sequence as SequenceType } from '../../../shared/types/sequence';
import { hasContent } from '../../../shared/utils/utils';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

const SequenceSection = ({
  accession,
  data,
}: {
  accession: string;
  data?: SequenceType;
}) => {
  if (!data || !hasContent(data)) {
    return null;
  }

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Sequence).name}</h2>}
      id={EntrySection.Sequence}
    >
      <CommonSequenceView accession={accession} sequence={data} />
    </Card>
  );
};

export default SequenceSection;
