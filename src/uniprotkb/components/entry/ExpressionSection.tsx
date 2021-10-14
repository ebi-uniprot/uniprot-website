import { Card } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';

import { UIModel } from '../../adapters/sectionConverter';
import { FreeTextComment } from '../../types/commentTypes';

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
      header={<h2>{getEntrySectionNameAndId(EntrySection.Expression).name}</h2>}
      id={EntrySection.Expression}
      data-entry-section
    >
      <FreeTextView
        comments={
          data.commentsData.get('TISSUE SPECIFICITY') as
            | FreeTextComment[]
            | undefined
        }
        title="tissue specificity"
      />
      <FreeTextView
        comments={
          data.commentsData.get('INDUCTION') as FreeTextComment[] | undefined
        }
        title="induction"
      />
      <FreeTextView
        comments={
          data.commentsData.get('DEVELOPMENTAL STAGE') as
            | FreeTextComment[]
            | undefined
        }
        title="developmental stage"
      />
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default ExpressionSection;
