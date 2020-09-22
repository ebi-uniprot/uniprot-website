import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection from '../../types/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';

import { UIModel } from '../../adapters/sectionConverter';
import { CommentType, FreeTextComment } from '../../types/commentTypes';

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
            data.commentsData.get(
              CommentType.TISSUE_SPECIFICITY
            ) as FreeTextComment[]
          }
          title={CommentType.TISSUE_SPECIFICITY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.INDUCTION) as FreeTextComment[]
          }
          title={CommentType.INDUCTION.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.DEVELOPMENTAL_STAGE
            ) as FreeTextComment[]
          }
          title={CommentType.DEVELOPMENTAL_STAGE.toLowerCase()}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ExpressionSection;
