import { Card } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import { FreeTextType } from '../../../uniprotkb/types/commentTypes';
import {
  ModifiedPrediction,
  UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';
import annotationTypeToSection from '../../config/UniFireAnnotationTypeToSection';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { getPredictionsByType } from '../../utils/subEntry';

type Props = {
  data: UniFireModel | undefined;
  annotationTypes: string[];
  section: SubEntrySection;
};

const UniFireInferredSection = ({ data, annotationTypes, section }: Props) => {
  const predictionsByType: Record<string, ModifiedPrediction[] | undefined> =
    {};
  annotationTypes.forEach((type) => {
    predictionsByType[type] = getPredictionsByType(data?.predictions, type);
  });

  if (Object.values(predictionsByType).flat().length) {
    return (
      <Card
        header={
          // TODO: Fix help article id
          <h2>{entrySectionToLabel[section]}</h2>
        }
        id={section}
        data-entry-section
      >
        {Object.entries(predictionsByType).map(([type, predictions]) => (
          <div key={type}>
            {predictions?.length ? (
              <>
                {/* TODO: Add help */}
                {annotationTypeToSection[type].subSectionLabel ? (
                  <h3>{annotationTypeToSection[type].subSectionLabel}</h3>
                ) : null}
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
                        commentType: annotationTypeToSection[type]
                          .freeTextType as FreeTextType,
                      },
                    ]}
                  />
                ))}
              </>
            ) : null}
          </div>
        ))}
      </Card>
    );
  }
  return null;
};

export default UniFireInferredSection;
