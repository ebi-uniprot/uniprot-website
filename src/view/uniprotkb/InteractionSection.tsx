import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FreeTextView from './components/FreeTextView';
import XRefView from './components/XRefView';
import Comment from '../../model/types/Comment';
import { UIModel } from '../../model/uniprotkb/SectionConverter';

const InteractionSection: FC<{
  data: UIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  const comments = data.commentsData.get(Comment.SUBUNIT);
  return (
    <div id={EntrySection.Interaction}>
      <Card title={EntrySection.Interaction}>
        {comments && <FreeTextView comments={comments} includeTitle />}
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default InteractionSection;
