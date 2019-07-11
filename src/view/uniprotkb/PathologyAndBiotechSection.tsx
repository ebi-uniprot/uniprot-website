import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import DiseaseInvolvementView from '../uniprotkb/components/DiseaseInvolvementView';
import KeywordView from '../uniprotkb/components/KeywordView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import Comment from '../../model/types/Comment';
import XRefView from './components/XRefView';

const PathologyAndBiotechSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, primaryAccession, sequence }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.PathologyAndBioTech}>
      <Card title={EntrySection.PathologyAndBioTech}>
        <DiseaseInvolvementView
          comments={data.commentsData.get(Comment.DISEASE)}
          primaryAccession={primaryAccession}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default PathologyAndBiotechSection;
