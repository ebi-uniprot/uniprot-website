import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import hasContent from '../../model/utils/utils';
import FreeTextView from './components/FreeTextView';
import CatalyticActivityView from './components/CatalyticActivityView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import FeaturesView from './components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import {
  CommentType,
  CatalyticActivity,
  FreeText,
} from '../../model/types/CommentTypes';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import GoRibbon from './components/GoRibbon';

const FunctionSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Function}>
      <Card title={EntrySection.Function}>
        <FreeTextView
          comments={data.commentsData.get(CommentType.FUNCTION) as FreeText[]}
        />
        <CatalyticActivityView
          comments={
            data.commentsData.get(
              CommentType.CATALYTIC_ACTIVITY
            ) as CatalyticActivity[]
          }
        />
        <FreeTextView
          comments={data.commentsData.get(CommentType.PATHWAY) as FreeText[]}
          includeTitle
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.MISCELLANEOUS) as FreeText[]
          }
          includeTitle
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <GoRibbon primaryAccession={primaryAccession} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FunctionSection;
