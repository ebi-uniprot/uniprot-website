import { Link } from 'react-router-dom';
import { Card, FullViewIcon } from 'franklin-sites';

import XRefView from '../protein-data-views/XRefView';
import FreeTextView from '../protein-data-views/FreeTextView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import DiseaseInvolvementView from '../protein-data-views/DiseaseInvolvementView';
import KeywordView from '../protein-data-views/KeywordView';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';

import { hasContent } from '../../../shared/utils/utils';
import { getEntryPath } from '../../../app/config/urls';

import { UIModel } from '../../adapters/sectionConverter';
import { DiseaseComment, FreeTextComment } from '../../types/commentTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from './Entry';

import styles from './styles/disease-and-drugs.module.scss';

import variantsImg from '../../../images/variants.jpg';

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence: string;
  taxId: number | undefined;
  hasImportedVariants: boolean;
};

const DiseaseAndDrugsSection = ({
  data,
  primaryAccession,
  sequence,
  taxId,
  hasImportedVariants,
}: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  const nameAndId = getEntrySectionNameAndId(
    EntrySection.DiseaseVariants,
    taxId
  );
  return (
    <Card
      header={
        <h2 data-article-id="disease_phenotypes_variants_section">
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
        features={data.featuresData}
        primaryAccession={primaryAccession}
        includeTitle
      />
      <FreeTextView
        comments={
          data.commentsData.get('ALLERGEN') as FreeTextComment[] | undefined
        }
        title="Allergenic properties"
        articleId="allergenic_properties"
      />
      <FreeTextView
        comments={
          data.commentsData.get('DISRUPTION PHENOTYPE') as
            | FreeTextComment[]
            | undefined
        }
        title="Disruption phenotype"
        articleId="disruption_phenotype"
      />
      <FreeTextView
        comments={
          data.commentsData.get('PHARMACEUTICAL') as
            | FreeTextComment[]
            | undefined
        }
        title="Pharmaceutical"
        articleId="pharmaceutical_use"
      />
      <FreeTextView
        comments={
          data.commentsData.get('TOXIC DOSE') as FreeTextComment[] | undefined
        }
        title="Toxic dose"
        articleId="toxic_dose"
      />
      <FeaturesView
        primaryAccession={primaryAccession}
        features={data.featuresData}
        sequence={sequence}
      />
      {hasImportedVariants && (
        <section>
          <h3>Variants</h3>
          <div className={styles.variants}>
            <img src={variantsImg} width="1944" height="1024" alt="" />
            <div>
              <p>
                We now provide the &quot;Disease & Variants&quot; viewer in its
                own tab.
              </p>
              <p>
                The viewer provides variants from UniProt as well as other
                sources including ClinVar and dbSNP.
              </p>
              <p>
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    primaryAccession,
                    TabLocation.VariantsViewer
                  )}
                >
                  Go to variants tabs <FullViewIcon width="0.75em" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default DiseaseAndDrugsSection;
