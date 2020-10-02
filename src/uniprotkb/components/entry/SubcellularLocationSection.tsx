import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../utils';
import EntrySection, { EntrySectionIDs } from '../../types/entrySection';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/FeaturesView';
import { UIModel } from '../../adapters/sectionConverter';
import SubcellularLocationView from '../protein-data-views/SubcellularLocationView';
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
    <div
      id={EntrySectionIDs[EntrySection.SubCellularLocation]}
      data-entry-section
    >
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
