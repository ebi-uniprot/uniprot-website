import { Card } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import SubcellularLocationWithVizView from '../protein-data-views/SubcellularLocationWithVizView';
import { hasContent } from '../../../shared/utils/utils';

import {
  SubcellularLocationComment,
  CommentType,
} from '../../types/commentTypes';
import { SubcellularLocationUIModel } from '../../adapters/subcellularLocationConverter';

type Props = {
  data: SubcellularLocationUIModel;
  sequence: string;
};

const SubcellularLocationSection = ({ data, sequence }: Props) => {
  if (!hasContent(data)) {
    return null;
  }

  return (
    <Card
      header={
        <h2>
          {getEntrySectionNameAndId(EntrySection.SubCellularLocation).name}
        </h2>
      }
      id={EntrySection.SubCellularLocation}
      data-entry-section
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
  );
};

export default SubcellularLocationSection;
