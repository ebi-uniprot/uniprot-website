import { Card } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import { FreeTextType } from '../../../uniprotkb/types/commentTypes';
import {
  ModifiedPrediction,
  UniParcSubEntryUIModel,
} from '../../adapters/uniParcSubEntryConverter';
import annotationTypeToSection from '../../config/UniFireAnnotationTypeToSection';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import SubEntryFeaturesView from './SubEntryFeaturesView';

type Props = {
  data: UniParcSubEntryUIModel;
  annotationTypes: string[];
  section: SubEntrySection;
};

const UniFireInferredSection = ({ data, annotationTypes, section }: Props) => {
  const { sequence } = data.entry;
  const predictionsByType: Record<string, ModifiedPrediction[] | undefined> =
    {};

  annotationTypes.forEach((type) => {
    predictionsByType[type] =
      (data.unifire?.predictions as ModifiedPrediction[])?.filter(
        (prediction) => prediction.annotationType === type
      ) || [];
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
                {type.startsWith('feature') && sequence?.value ? (
                  <SubEntryFeaturesView
                    sequence={sequence.value}
                    predictions={predictions}
                  />
                ) : (
                  predictions.map((prediction, index) => (
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
                  ))
                )}
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
