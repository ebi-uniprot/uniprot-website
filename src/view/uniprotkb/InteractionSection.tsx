import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import XRefView from '../uniprotkb/components/XRefView';
import Comment from '../../model/types/Comment';
import { UIModel } from '../../model/uniprotkb/SectionConverter';

const InteractionSection: FC<{
  data: UIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  const comments = data.commentsData.get(Comment.SUBUNIT);
  return (
    <div id={EntrySection.Interaction}>
      <Card title={EntrySection.Interaction}>
        {comments && <FreeTextView comments={comments} includeTitle={true} />}
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default InteractionSection;
