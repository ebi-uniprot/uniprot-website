import { Card } from 'franklin-sites';
import { memo } from 'react';

import { type UniProtkbUIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import KeywordView from '../../../uniprotkb/components/protein-data-views/KeywordView';
import FeaturesView from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import { type FreeTextComment } from '../../../uniprotkb/types/commentTypes';
import UniProtKBEntrySection from '../../../uniprotkb/types/entrySection';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import { hasAnnotationContent } from '../../utils/subEntry';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';

type Props = {
  data?: UniParcSubEntryUIModel;
  annotations?: UniProtkbUIModel;
};

// Hybrid section: the entry's intrinsic InterPro `sequenceFeatures` (always
// present) plus the family/domain annotations (DOMAIN / SIMILARITY comments and
// features) taken from the converted `annotations` — source-agnostic, so it
// works for both the UniFire and precomputed branches.
const SubEntryFamilyAndDomains = ({ data, annotations }: Props) => {
  const { sequenceFeatures, sequence } = data?.entry || {};
  const familyAndDomains =
    annotations?.[UniProtKBEntrySection.FamilyAndDomains];

  const hasInterPro = Boolean(sequenceFeatures?.length && sequence?.value);
  const hasAnnotations = hasAnnotationContent(familyAndDomains);
  if (!hasInterPro && !hasAnnotations) {
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
      {hasAnnotations && familyAndDomains && (
        <>
          <FeaturesView
            primaryAccession={annotations?.primaryAccession ?? ''}
            features={familyAndDomains.featuresData}
            sequence={sequence?.value}
            // A UniParc sub-entry accession is synthetic — suppress the
            // accession-keyed full-view link and per-feature tools.
            enableExternalData={false}
          />
          <FreeTextView
            comments={
              familyAndDomains.commentsData.get('DOMAIN') as
                | FreeTextComment[]
                | undefined
            }
            title="Domain"
            articleId="domain_cc"
          />
          <FreeTextView
            comments={
              familyAndDomains.commentsData.get('SIMILARITY') as
                | FreeTextComment[]
                | undefined
            }
            title="Sequence similarities"
            articleId="sequence_similarities"
          />
          <KeywordView keywords={familyAndDomains.keywordData} />
        </>
      )}
      {hasInterPro && sequenceFeatures && sequence?.value && (
        <UniParcFeaturesView
          data={sequenceFeatures}
          sequence={sequence.value}
        />
      )}
    </Card>
  );
};

export default memo(SubEntryFamilyAndDomains);
