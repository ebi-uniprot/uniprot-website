import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import EntrySection from '../../types/entrySection';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/FeaturesView';
import SubcellularLocationView from '../protein-data-views/SubcellularLocationView';

import { hasContent } from '../../../shared/utils/utils';

import { UIModel } from '../../adapters/sectionConverter';
import {
  SubcellularLocationComment,
  CommentType,
} from '../../types/commentTypes';

const SubcellularLocationSection: FC<{
  data: UIModel;
  sequence: string;
}> = ({ data, sequence }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.SubCellularLocation}>
      <Card title={EntrySection.SubCellularLocation}>
        <SubcellularLocationView
          comments={
            data.commentsData.get(
              CommentType.SUBCELLULAR_LOCATION
            ) as SubcellularLocationComment[]
          }
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
      </Card>
    </div>
  );
};

export default SubcellularLocationSection;
