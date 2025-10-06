import { Card } from 'franklin-sites';
import { memo } from 'react';

import {
  ModifiedPrediction,
  UniParcSubEntryUIModel,
} from '../../adapters/uniParcSubEntryConverter';
import { groupTypesBySection } from '../../config/UniFireAnnotationTypeToSection';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import SubEntryFeaturesView from './SubEntryFeaturesView';
import UniFirePredictionsFreeTextViewList from './UniFirePredictionsFreeTextViewList';

type Props = {
  data?: UniParcSubEntryUIModel;
};

const FamilyAndDomainsSection = ({ data }: Props) => {
  const { entry, unifire } = data || {};
  const { sequenceFeatures, sequence } = entry || {};

  const similarityPredictions = unifire?.predictions?.filter(
    (p) => p.annotationType === 'comment.similarity'
  );

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

  //  TODO: comment.domain
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
      {similarityPredictions && (
        <>
          <h3>Sequence similarities</h3>
          <UniFirePredictionsFreeTextViewList
            annotationType="similarity"
            predictions={similarityPredictions as ModifiedPrediction[]}
            freeTextType="SIMILARITY"
          />
        </>
      )}
    </Card>
  );
};

export default memo(FamilyAndDomainsSection);
