import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import hasContent from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FeaturesView from './components/FeaturesView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import FreeTextView from './components/FreeTextView';
import { CommentType, FreeText } from '../../model/types/CommentTypes';
import { UIModel } from '../../model/uniprotkb/SectionConverter';

const ProteinProcessingSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  const { featuresData, keywordData, xrefData, commentsData } = data;
  return (
    <div id={EntrySection.ProteinProcessing}>
      <Card title={EntrySection.ProteinProcessing}>
        <FeaturesView features={featuresData} sequence={sequence} />
        <FreeTextView
          comments={commentsData.get(CommentType.PTM) as FreeText[]}
          includeTitle
        />
        <KeywordView keywords={keywordData} />
        <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ProteinProcessingSection;
