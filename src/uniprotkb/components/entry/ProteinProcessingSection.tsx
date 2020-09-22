import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import EntrySection from '../../types/entrySection';
import FeaturesView from '../protein-data-views/FeaturesView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FreeTextView from '../protein-data-views/FreeTextView';

import { hasContent } from '../../../shared/utils/utils';

import { CommentType, FreeTextComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';

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
          comments={commentsData.get(CommentType.PTM) as FreeTextComment[]}
          title={CommentType.PTM.toLowerCase()}
        />
        <KeywordView keywords={keywordData} />
        <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default ProteinProcessingSection;
