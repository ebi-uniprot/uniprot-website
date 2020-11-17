import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import XRefView from '../protein-data-views/XRefView';
import VariationView from '../protein-data-views/VariationView';
import FreeTextView from '../protein-data-views/FreeTextView';
import FeaturesView from '../protein-data-views/FeaturesView';
import DiseaseInvolvementView from '../protein-data-views/DiseaseInvolvementView';
import KeywordView from '../protein-data-views/KeywordView';
import EntrySection, { EntrySectionIDs } from '../../types/entrySection';

import { hasContent } from '../../../shared/utils/utils';
import { UIModel } from '../../adapters/sectionConverter';

import {
  CommentType,
  DiseaseComment,
  FreeTextComment,
} from '../../types/commentTypes';

const DiseaseAndDrugsSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
  taxId: number | undefined;
}> = ({ data, primaryAccession, sequence, taxId }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }

  const taxonomyBasedSection =
    taxId === 9606 ? EntrySection.DiseaseAndDrugs : EntrySection.Phenotypes;

  return (
    <div id={EntrySectionIDs[taxonomyBasedSection]} data-entry-section>
      <Card title={taxonomyBasedSection}>
        <DiseaseInvolvementView
          comments={
            data.commentsData.get(CommentType.DISEASE) as DiseaseComment[]
          }
          primaryAccession={primaryAccession}
          includeTitle
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.ALLERGEN) as FreeTextComment[]
          }
          title={CommentType.ALLERGEN.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.DISRUPTION_PHENOTYPE
            ) as FreeTextComment[]
          }
          title={CommentType.DISRUPTION_PHENOTYPE.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.PHARMACEUTICAL
            ) as FreeTextComment[]
          }
          title={CommentType.PHARMACEUTICAL.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.TOXIC_DOSE) as FreeTextComment[]
          }
          title={CommentType.TOXIC_DOSE.toLowerCase()}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <VariationView primaryAccession={primaryAccession} title="Variants" />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default DiseaseAndDrugsSection;
