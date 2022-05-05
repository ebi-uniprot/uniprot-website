import { Card } from 'franklin-sites';

import XRefView from '../protein-data-views/XRefView';
import VariationView from '../protein-data-views/VariationView';
import FreeTextView from '../protein-data-views/FreeTextView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import DiseaseInvolvementView from '../protein-data-views/DiseaseInvolvementView';
import KeywordView from '../protein-data-views/KeywordView';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';

import { UIModel } from '../../adapters/sectionConverter';

import { DiseaseComment, FreeTextComment } from '../../types/commentTypes';

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence: string;
  taxId: number | undefined;
};

const DiseaseAndDrugsSection = ({
  data,
  primaryAccession,
  sequence,
  taxId,
}: Props) => {
  // NOTE: do not check if content is there or not, always display because of variants
  const nameAndId = getEntrySectionNameAndId(
    EntrySection.DiseaseVariants,
    taxId
  );
  return (
    <Card
      header={
        <h2 data-article-id="pathology_and_biotech_section">
          {nameAndId.name}
        </h2>
      }
      id={nameAndId.id}
      data-entry-section
    >
      <DiseaseInvolvementView
        comments={
          data.commentsData.get('DISEASE') as DiseaseComment[] | undefined
        }
        primaryAccession={primaryAccession}
        includeTitle
      />
      <FreeTextView
        comments={
          data.commentsData.get('ALLERGEN') as FreeTextComment[] | undefined
        }
        title="allergen"
      />
      <FreeTextView
        comments={
          data.commentsData.get('DISRUPTION PHENOTYPE') as
            | FreeTextComment[]
            | undefined
        }
        title="disruption phenotype"
      />
      <FreeTextView
        comments={
          data.commentsData.get('PHARMACEUTICAL') as
            | FreeTextComment[]
            | undefined
        }
        title="pharmaceutical"
      />
      <FreeTextView
        comments={
          data.commentsData.get('TOXIC DOSE') as FreeTextComment[] | undefined
        }
        title="toxic dose"
      />
      <FeaturesView
        primaryAccession={primaryAccession}
        features={data.featuresData}
        sequence={sequence}
      />
      <VariationView primaryAccession={primaryAccession} title="Variants" />
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default DiseaseAndDrugsSection;
