import { memo } from 'react';
import { Card } from 'franklin-sites';

import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import CommunityCuration from './CommunityCuration';

import { hasContent } from '../../../shared/utils/utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import EntrySection from '../../types/entrySection';
import { FreeTextComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';
import { Reference } from '../../../supporting-data/citations/adapters/citationsConverter';

type Props = {
  data: UIModel;
  sequence: string;
  primaryAccession: string;
  communityReferences: Reference[];
};

const FamilyAndDomainsSection = ({
  data,
  sequence,
  primaryAccession,
  communityReferences,
}: Props) => {
  if (!hasContent(data) && !communityReferences.length) {
    return null;
  }
  return (
    <Card
      header={
        <h2 data-article-id="family_and_domains_section">
          {getEntrySectionNameAndId(EntrySection.FamilyAndDomains).name}
        </h2>
      }
      id={EntrySection.FamilyAndDomains}
      data-entry-section
    >
      <FeaturesView
        primaryAccession={primaryAccession}
        features={data.featuresData}
        sequence={sequence}
      />
      <FreeTextView
        comments={
          data.commentsData.get('DOMAIN') as FreeTextComment[] | undefined
        }
        title="Domain"
        articleId="domain_cc"
      />
      <FreeTextView
        comments={
          data.commentsData.get('SIMILARITY') as FreeTextComment[] | undefined
        }
        title="Sequence similarities"
        articleId="sequence_similarities"
      />
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      <CommunityCuration communityReferences={communityReferences} />
    </Card>
  );
};

export default memo(FamilyAndDomainsSection);
