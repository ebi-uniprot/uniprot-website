import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import hasContent from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FreeTextView from './components/FreeTextView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import { CommentType, FreeText } from '../../model/types/CommentTypes';

const ExpressionSection: FC<{
  data: UIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Expression}>
      <Card title={EntrySection.Expression}>
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.TISSUE_SPECIFICITY) as FreeText[]
          }
          includeTitle
        />
        <FreeTextView
          comments={data.commentsData.get(CommentType.INDUCTION) as FreeText[]}
          includeTitle
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ExpressionSection;
