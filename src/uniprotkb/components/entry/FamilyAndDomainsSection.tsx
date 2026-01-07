import { Card } from 'franklin-sites';
import { memo } from 'react';

import { hasContent } from '../../../shared/utils/utils';
import { type UIModel } from '../../adapters/sectionConverter';
import { type FreeTextComment } from '../../types/commentTypes';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import XRefView from '../protein-data-views/XRefView';

type Props = {
  data: UIModel;
  sequence?: string;
  primaryAccession: string;
  uniParcID?: string;
};

const FamilyAndDomainsSection = ({
  data,
  sequence,
  primaryAccession,
  uniParcID,
}: Props) => {
  if (!hasContent(data)) {
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
      <XRefView
        xrefs={data.xrefData}
        primaryAccession={primaryAccession}
        uniParcID={uniParcID}
      />
    </Card>
  );
};

export default memo(FamilyAndDomainsSection);
