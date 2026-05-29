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
  uniparcData?: UniParcSubEntryUIModel;
  annotations?: UniProtkbUIModel;
};

// Hybrid section: combines two sources by how the information reaches the page.
//   - `uniparcData` carries entry-intrinsic data — the InterPro `sequenceFeatures`
//     that live on the UniParc entry itself (always present when InterPro ran).
//   - `annotations` carries the predicted DOMAIN / SIMILARITY comments + family
//     features + keywords — converted from UniFire or precomputed predictions.
// Source-agnostic for `annotations`, so it works for both branches.
const SubEntryFamilyAndDomains = ({ uniparcData, annotations }: Props) => {
  const { sequenceFeatures, sequence } = uniparcData?.entry || {};
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
            // A UniParc sub-entry accession isn't a real UniProtKB one —
            // suppress the accession-keyed full-view link and tools column.
            isUniProtKBAccession={false}
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
