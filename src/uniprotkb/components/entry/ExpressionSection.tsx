import { Card } from 'franklin-sites';
import { memo } from 'react';

import { hasContent } from '../../../shared/utils/utils';
import { type UIModel } from '../../adapters/sectionConverter';
import { type FreeTextComment } from '../../types/commentTypes';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';

type Props = {
  data: UIModel;
  primaryAccession: string;
};

const ExpressionSection = ({ data, primaryAccession }: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Card
      header={
        <h2 data-article-id="expression_section">
          {getEntrySectionNameAndId(EntrySection.Expression).name}
        </h2>
      }
      id={EntrySection.Expression}
      data-entry-section
    >
      <FreeTextView
        comments={
          data.commentsData.get('TISSUE SPECIFICITY') as
            | FreeTextComment[]
            | undefined
        }
        title="Tissue specificity"
        articleId="tissue_specificity"
      />
      <FreeTextView
        comments={
          data.commentsData.get('INDUCTION') as FreeTextComment[] | undefined
        }
        title="Induction"
        articleId="induction"
      />
      <FreeTextView
        comments={
          data.commentsData.get('DEVELOPMENTAL STAGE') as
            | FreeTextComment[]
            | undefined
        }
        title="Developmental stage"
        articleId="developmental_stage"
      />
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(ExpressionSection);
