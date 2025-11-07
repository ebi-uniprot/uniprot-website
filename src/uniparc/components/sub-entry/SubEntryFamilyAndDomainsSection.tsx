import { Card } from 'franklin-sites';
import { Fragment, memo } from 'react';

import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import { FreeTextType } from '../../../uniprotkb/types/commentTypes';
import {
  ModifiedPrediction,
  UniParcSubEntryUIModel,
} from '../../adapters/uniParcSubEntryConverter';
import annotationTypeToSection, {
  groupTypesBySection,
} from '../../config/UniFireAnnotationTypeToSection';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import SubEntryFeaturesView from './SubEntryFeaturesView';

type Props = {
  data?: UniParcSubEntryUIModel;
};

const FamilyAndDomainsSection = ({ data }: Props) => {
  const { entry, unifire } = data || {};
  const { sequenceFeatures, sequence } = entry || {};

  const familyAndDomainSubsections = groupTypesBySection(
    SubEntrySection.FamilyAndDomains
  ).filter((type) => type.startsWith('comment'));

  const commentPredictions: Record<string, ModifiedPrediction[]> = {};
  familyAndDomainSubsections.forEach((commentType) => {
    const predictions = (unifire?.predictions as ModifiedPrediction[])
      ?.filter((p) => p.annotationType === commentType)
      .filter(Boolean);
    if (predictions?.length) {
      commentPredictions[commentType] = predictions;
    }
  });

  const familyAndDomainFeatureTypes = groupTypesBySection(
    SubEntrySection.FamilyAndDomains
  ).filter((type) => type.startsWith('feature'));

  const featurePredictions = familyAndDomainFeatureTypes
    .map((featureType) =>
      (unifire?.predictions as ModifiedPrediction[])?.filter(
        (p) => p.annotationType === featureType
      )
    )
    .filter(Boolean)
    .flat();

  if (!sequenceFeatures || !sequence?.value) {
    return null;
  }

  return (
    <Card
      header={
        <h2 data-article-id="family_and_domains_section">
          {entrySectionToLabel[SubEntrySection.FamilyAndDomains]}
        </h2>
      }
      id={SubEntrySection.FamilyAndDomains}
      data-entry-section
    >
      {featurePredictions.length ? (
        <SubEntryFeaturesView
          sequence={sequence.value}
          predictions={featurePredictions}
        />
      ) : null}
      <UniParcFeaturesView data={sequenceFeatures} sequence={sequence.value} />
      {Object.keys(commentPredictions)?.length
        ? Object.entries(commentPredictions)?.map(([type, predictions]) => (
            <Fragment key={type}>
              <h3>{annotationTypeToSection[type].subSectionLabel}</h3>
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
            </Fragment>
          ))
        : null}
    </Card>
  );
};

export default memo(FamilyAndDomainsSection);
