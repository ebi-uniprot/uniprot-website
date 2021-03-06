import { FC } from 'react';
import { Card } from 'franklin-sites';

import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FeaturesView from '../protein-data-views/FeaturesView';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { CommentType, FreeTextComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';
import { hasContent } from '../../../shared/utils/utils';

const FamilyAndDomainsSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.FamilyAndDomains} data-entry-section>
      <Card
        title={getEntrySectionNameAndId(EntrySection.FamilyAndDomains).name}
      >
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.DOMAIN) as FreeTextComment[]
          }
          title={CommentType.DOMAIN.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.SIMILARITY) as FreeTextComment[]
          }
          title={CommentType.SIMILARITY.toLowerCase()}
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FamilyAndDomainsSection;
