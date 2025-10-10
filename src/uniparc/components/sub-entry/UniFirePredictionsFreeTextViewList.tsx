import { InfoList } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import {
  CommentType,
  FreeTextType,
} from '../../../uniprotkb/types/commentTypes';
import { ModifiedPrediction } from '../../adapters/uniParcSubEntryConverter';

type Props = {
  annotationType: string;
  predictions: ModifiedPrediction[];
  freeTextType: CommentType;
};

const UniFirePredictionsFreeTextViewList = ({
  annotationType,
  predictions,
  freeTextType,
}: Props) => {
  const infoDataContent = predictions.map((prediction, index) => {
    return (
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
    );
  });

  return (
    <InfoList
      infoData={[{ title: annotationType, content: infoDataContent }]}
    />
  );
};

export default UniFirePredictionsFreeTextViewList;
