import { Card } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import {
  CommentType,
  FreeTextType,
} from '../../../uniprotkb/types/commentTypes';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { UniFireModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { constructPredictionEvidences } from './UniFirePredictionsList';

type Props = {
  data: UniFireModel | undefined;
  annotationType: string;
  freeTextType: CommentType | string; // To be removed: 'string' type to allow 'KEYWORDS' which is not in CommentType
  section: SubEntrySection;
};

const UniFireInferredSection = ({
  data,
  annotationType,
  freeTextType,
  section,
}: Props) => {
  const predictions = data?.predictions?.filter(
    (prediction) => prediction.annotationType === annotationType
  );
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
        {predictions.map((prediction, index) => {
          const evidences: Evidence[] = constructPredictionEvidences(
            prediction.evidence
          );
          return (
            <FreeTextView
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              comments={[
                {
                  texts: [
                    { value: prediction.annotationValue, evidences: evidences },
                  ],
                  commentType: freeTextType as FreeTextType,
                },
              ]}
            />
          );
        })}
      </Card>
    );
  }
  return null;
};

export default UniFireInferredSection;
