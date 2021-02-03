import { FC, useEffect } from 'react';
import { Card } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/FeaturesView';
import SubcellularLocationView from '../protein-data-views/SubcellularLocationView';
import { hasContent } from '../../../shared/utils/utils';

import {
  SubcellularLocationComment,
  CommentType,
} from '../../types/commentTypes';
import { SubcellularLocationUIModel } from '../../adapters/subcellularLocationConverter';
import useSafeState from '../../../shared/hooks/useSafeState';

const SubcellularLocationSection: FC<{
  data: SubcellularLocationUIModel;
  sequence: string;
}> = ({ data, sequence }): JSX.Element | null => {
  const [ceLoaded, setCELoaded] = useSafeState(false);

  // TODO: how is the custom element being defined?
  useEffect(() => {
    import('@swissprot/swissbiopics-visualizer').then(
      () => setCELoaded(true),
      // eslint-disable-next-line no-console
      (error) => console.error(error)
    );
  }, [setCELoaded]);

  if (!ceLoaded) {
    return null;
  }

  if (!hasContent(data)) {
    return null;
  }

  return (
    <div id={EntrySection.SubCellularLocation} data-entry-section>
      <Card
        title={getEntrySectionNameAndId(EntrySection.SubCellularLocation).name}
      >
        <SubcellularLocationView
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
