import { Card } from 'franklin-sites';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import { FreeTextType } from '../../../uniprotkb/types/commentTypes';
import {
  ModifiedPrediction,
  UniParcSubEntryUIModel,
} from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import SubEntryFeaturesView from './SubEntryFeaturesView';

type Props = {
  data: UniParcSubEntryUIModel;
  section: SubEntrySection;
};

const noSubSection = 'NoSubSection';

const UniFireInferredSection = ({ data, section }: Props) => {
  const { sequence } = data.entry;
  const predictionsByType: Record<string, ModifiedPrediction[] | undefined> =
    {};

  for (const prediction of data.unifire?.[section] || []) {
    const subSectionLabel =
      prediction?.sectionObject?.subSectionLabel || noSubSection;
    if (!predictionsByType[subSectionLabel]) {
      predictionsByType[subSectionLabel] = [];
    }
    predictionsByType[subSectionLabel]?.push(prediction);
  }

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
                {type === noSubSection ? null : <h3>{type}</h3>}
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
                          commentType: prediction.sectionObject
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
