import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from './components/FreeTextView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import FeaturesView from './components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import hasContent from '../../model/utils/utils';
import { CommentType, FreeText } from '../../model/types/CommentTypes';
import { UIModel } from '../../model/uniprotkb/SectionConverter';

const FamilyAndDomainsSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.FamilyAndDomains}>
      <Card title={EntrySection.FamilyAndDomains}>
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <FreeTextView
          comments={data.commentsData.get(CommentType.DOMAIN) as FreeText[]}
          includeTitle
        />
        <FreeTextView
          comments={data.commentsData.get(CommentType.SIMILARITY) as FreeText[]}
          includeTitle
        />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FamilyAndDomainsSection;
