import { InfoList } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import {
  CommentType,
  FreeTextType,
} from '../../../uniprotkb/types/commentTypes';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { Prediction } from '../../adapters/uniParcSubEntryConverter';
import { constructPredictionEvidences } from '../../utils/subEntry';

type Props = {
  annotationType: string;
  predictions: Prediction[];
  freeTextType: CommentType;
};

const UniFirePredictionsFreeTextViewList = ({
  annotationType,
  predictions,
  freeTextType,
}: Props) => {
  const infoDataContent = predictions.map((prediction, index) => {
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
              {
                value: prediction.annotationValue,
                evidences: evidences,
              },
            ],
            commentType: freeTextType as FreeTextType,
          },
        ]}
      />
    );
  });

  return (
    <InfoList
      infoData={[{ title: annotationType, content: infoDataContent }]}
    />
  );
};

export default UniFirePredictionsFreeTextViewList;
