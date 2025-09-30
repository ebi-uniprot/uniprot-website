import { Card } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import {
  CommentType,
  FreeTextType,
} from '../../../uniprotkb/types/commentTypes';
import { UniFireModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { getPredictionsByType } from '../../utils/subEntry';

type Props = {
  data: UniFireModel | undefined;
  annotationType: string;
  freeTextType: CommentType;
  section: SubEntrySection;
};

const UniFireInferredSection = ({
  data,
  annotationType,
  freeTextType,
  section,
}: Props) => {
  const predictions = getPredictionsByType(data?.predictions, annotationType);
  if (predictions?.length) {
    return (
      <Card
        header={
          // TODO: Fix help article id
          <h2>{entrySectionToLabel[section]}</h2>
        }
        id={section}
        data-entry-section
      >
        {predictions.map((prediction, index) => (
          <FreeTextView
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            comments={[
              {
                texts: [
                  {
                    value: prediction.annotationValue,
                    evidences: prediction.evidence,
                  },
                ],
                commentType: freeTextType as FreeTextType,
              },
            ]}
          />
        ))}
      </Card>
    );
  }
  return null;
};

export default UniFireInferredSection;
