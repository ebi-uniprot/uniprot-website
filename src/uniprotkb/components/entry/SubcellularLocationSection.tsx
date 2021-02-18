import { FC } from 'react';
import { Card } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/FeaturesView';
import SubcellularLocationWithVizView from '../protein-data-views/SubcellularLocationWithVizView';
import { hasContent } from '../../../shared/utils/utils';

import {
  SubcellularLocationComment,
  CommentType,
} from '../../types/commentTypes';
import { SubcellularLocationUIModel } from '../../adapters/subcellularLocationConverter';

const SubcellularLocationSection: FC<{
  data: SubcellularLocationUIModel;
  sequence: string;
}> = ({ data, sequence }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }

  return (
    <div id={EntrySection.SubCellularLocation} data-entry-section>
      <Card
        title={getEntrySectionNameAndId(EntrySection.SubCellularLocation).name}
      >
        <SubcellularLocationWithVizView
          comments={
            data.commentsData.get(
              CommentType.SUBCELLULAR_LOCATION
            ) as SubcellularLocationComment[]
          }
          taxonId={data.organismData?.taxonId}
          lineage={data.organismData?.lineage}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <KeywordView keywords={data.keywordData} />
      </Card>
    </div>
  );
};

export default SubcellularLocationSection;
