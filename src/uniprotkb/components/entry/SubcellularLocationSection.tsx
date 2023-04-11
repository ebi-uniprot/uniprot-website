import { Card } from 'franklin-sites';

import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import SubcellularLocationWithVizView from '../protein-data-views/SubcellularLocationWithVizView';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';

import { SubcellularLocationComment } from '../../types/commentTypes';
import { SubcellularLocationUIModel } from '../../adapters/subcellularLocationConverter';

type Props = {
  data: SubcellularLocationUIModel;
  sequence: string;
};

export const subcellularLocationSectionHasContent = <
  T extends Record<string | number | symbol, unknown>
>(
  data?: T
) => {
  if (!data) {
    return false;
  }
  const { commentsData, featuresData, goXrefs } = data;
  return hasContent({ commentsData, featuresData, goXrefs });
};

const SubcellularLocationSection = ({ data, sequence }: Props) => {
  if (!subcellularLocationSectionHasContent(data)) {
    return null;
  }

  return (
    <Card
      header={
        <h2 data-article-id="subcellular_location_section">
          {getEntrySectionNameAndId(EntrySection.SubCellularLocation).name}
        </h2>
      }
      id={EntrySection.SubCellularLocation}
      data-entry-section
    >
      <SubcellularLocationWithVizView
        primaryAccession={data.primaryAccession}
        comments={
          data.commentsData.get('SUBCELLULAR LOCATION') as
            | SubcellularLocationComment[]
            | undefined
        }
        taxonId={data.organismData?.taxonId}
        lineage={data.organismData?.lineage}
        goXrefs={data.goXrefs}
      />
      <FeaturesView
        primaryAccession={data.primaryAccession}
        features={data.featuresData}
        sequence={sequence}
      />
      <KeywordView keywords={data.keywordData} />
    </Card>
  );
};

export default SubcellularLocationSection;
