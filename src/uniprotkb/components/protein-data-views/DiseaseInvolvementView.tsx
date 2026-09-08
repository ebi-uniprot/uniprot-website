import { ExpandableList, InfoList, Tab, Tabs } from 'franklin-sites';
import { escapeRegExp } from 'lodash-es';
import { Fragment, memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { allEntryPages, getEntryPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import { MIN_ROWS_TO_EXPAND } from '../../../shared/components/table/constants';
import Table from '../../../shared/components/table/Table';
import externalUrls from '../../../shared/config/externalUrls';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { Namespace } from '../../../shared/types/namespaces';
import { type DiseaseComment } from '../../types/commentTypes';
import { type Variant } from '../../types/variantAISummary';
import variationViewerStyles from '../entry/tabs/variation-viewer/styles/variation-viewer.module.scss';
import variantSummary from './__tests__/__mocks__/variantAISummary.json';
import { RichText } from './FreeTextView';
import styles from './styles/disease-involvement-view.module.scss';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { type FeatureDatum } from './UniProtKBFeaturesView';
import { XRef } from './XRefView';

const sortByLocation = (a: FeatureDatum, b: FeatureDatum) => {
  const aStart = +a.location.start.value;
  const aEnd = a.location.end.value ? +a.location.end.value : -Infinity;
  const bStart = +b.location.start.value;
  const bEnd = b.location.end.value ? +b.location.end.value : -Infinity;
  if (aStart === bStart) {
    return aEnd - bEnd;
  }
  return aStart - bStart;
};

export const protvarVariantLink = (
  variant: FeatureDatum,
  accession: string
) => {
  let variantEl;
  if (
    variant.alternativeSequence?.originalSequence?.length === 1 &&
    variant.alternativeSequence?.alternativeSequences?.[0].length === 1
  ) {
    variantEl = (
      <ExternalLink
        url={externalUrls.ProtVar(
          `${accession} ${variant.alternativeSequence?.originalSequence}${variant.location.start.value}${variant.alternativeSequence?.alternativeSequences?.[0]}`
        )}
        title="View in ProtVar"
        noIcon
      >
        {variant.alternativeSequence?.originalSequence}
        {'>'}
        {variant.alternativeSequence?.alternativeSequences?.[0]}
      </ExternalLink>
    );
  } else if (
    !variant.alternativeSequence?.originalSequence &&
    !variant.alternativeSequence?.alternativeSequences?.[0]
  ) {
    variantEl = <em>missing</em>;
  } else {
    variantEl = (
      <>
        {variant.alternativeSequence?.originalSequence || <em>missing</em>}
        {'>'}
        {variant.alternativeSequence?.alternativeSequences?.[0] || (
          <em>missing</em>
        )}
      </>
    );
  }
  return variantEl;
};

const DiseaseVariants = ({
  variants,
  accession,
}: {
  variants: FeatureDatum[];
  accession: string;
}) => (
  <Table expandable={variants.length > MIN_ROWS_TO_EXPAND}>
    <Table.Head>
      <th>Variant ID</th>
      <th>Position(s)</th>
      <th>Change</th>
      <th>Description</th>
    </Table.Head>
    <Table.Body translate="no">
      {variants.map((variant, i) => {
        let position = `${variant.location.start.value}`;
        if (variant.location.start.value !== variant.location.end.value) {
          position += `-${variant.location.end.value}`;
        }

        let { description } = variant;

        if (variant.location.sequence) {
          description = `In isoform ${variant.location.sequence}; ${description}`;
        }

        return (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <Table.Row isOdd={Boolean(i % 2)} key={i}>
            <td>
              {variant.alternativeSequence?.originalSequence?.length === 1 &&
              variant.alternativeSequence?.alternativeSequences?.[0].length ===
                1 &&
              variant.featureId ? (
                <ExternalLink
                  url={externalUrls.UniProt(variant.featureId)}
                  title="View in Expasy"
                  noIcon
                >
                  {variant.featureId}
                </ExternalLink>
              ) : (
                variant.featureId
              )}
            </td>
            <td>{position}</td>
            <td className={variationViewerStyles.change}>
              {protvarVariantLink(variant, accession)}
            </td>
            <td translate="yes">
              <RichText>{description}</RichText>
              <UniProtKBEvidenceTag evidences={variant.evidences} />
            </td>
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);

const reDiseaseAcronymSentence = /^in [^;]+(;|$)/i;

type DiseaseInvolvementEntryProps = {
  comment: DiseaseComment;
  features?: FeatureDatum[];
  accession: string;
};

const DiseaseInvolvementEntry = ({
  comment,
  features,
  accession,
}: DiseaseInvolvementEntryProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  const entryPageMatch = useRouteMatch(allEntryPages);
  const { disease, molecule, note } = comment;

  if (!disease && !note) {
    return null;
  }

  const diseaseRE =
    disease?.acronym &&
    new RegExp(` ${escapeRegExp(disease.acronym)}(;|,| |$)`);

  const diseaseVariants =
    diseaseRE &&
    features
      ?.filter((feature) => {
        if (!disease.acronym || feature.type !== 'Natural variant') {
          return false;
        }
        const match = feature.description?.match(reDiseaseAcronymSentence);
        if (!match) {
          return false;
        }
        const [diseasePart] = match;
        return diseaseRE.test(diseasePart);
      })
      .sort(sortByLocation);

  const infoData = [];

  if (note?.texts) {
    const noteContent = (
      <ExpandableList descriptionString="notes">
        {note.texts.map((text, index) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <Fragment key={index}>
            {text.value}
            <UniProtKBEvidenceTag evidences={text.evidences} />
          </Fragment>
        ))}
      </ExpandableList>
    );
    if (disease?.diseaseId) {
      infoData.push({
        title: 'Note',
        content: noteContent,
      });
    } else {
      return <div className={styles['note-only']}>{noteContent}</div>;
    }
  }

  if (disease?.description) {
    infoData.push({
      title: 'Description',
      content: disease.description,
    });
  }

  if (disease?.diseaseCrossReference) {
    const { database, id } = disease.diseaseCrossReference;
    const databaseInfo =
      id && database && databaseInfoMaps?.databaseToDatabaseInfo[database];
    if (databaseInfo) {
      infoData.push({
        title: 'See also',
        content: (
          <>
            {`${databaseInfo.displayName}:`}
            <XRef
              database={database}
              xref={disease.diseaseCrossReference}
              primaryAccession={accession}
              databaseToDatabaseInfo={databaseInfoMaps?.databaseToDatabaseInfo}
            />
          </>
        ),
      });
    }
  }

  const title = (
    <>
      {disease?.diseaseId ? disease.diseaseId : <em>No disease ID</em>}
      {disease?.acronym && ` (${disease?.acronym})`}
    </>
  );

  return (
    <>
      <h4>
        {disease?.diseaseAccession ? (
          <Link to={getEntryPath(Namespace.diseases, disease.diseaseAccession)}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h4>
      {molecule && (
        <h5 className="tiny">
          {!entryPageMatch ? (
            `${molecule}`
          ) : (
            <a href={`#${molecule.replaceAll(' ', '_')}`}>{molecule}</a>
          )}
        </h5>
      )}
      <span className="text-block">
        <UniProtKBEvidenceTag evidences={disease?.evidences} />
      </span>
      <InfoList infoData={infoData} />
      {diseaseVariants && diseaseVariants.length ? (
        <>
          <h5>Natural variants in {disease?.acronym}</h5>
          <DiseaseVariants variants={diseaseVariants} accession={accession} />
        </>
      ) : null}
    </>
  );
};

const AIpoweredSummaries = () => {
  // TODO: Replace the mock with the API call when the API is ready.
  const variants = variantSummary.variants;

  return (
    <div>
      {variants.map((variant: Variant) => (
        <div key={variant.variant_name}>
          <h4>{variant.variant_name}</h4>
          <h5>Synthesis Summary</h5>
          <p>
            {variant.synthesis_summary.summary} (PMIDs:{' '}
            {variant.synthesis_summary.pmids.join(', ')})
          </p>
          <Table
            expandable={variant.impact_sentences.length > MIN_ROWS_TO_EXPAND}
          >
            <Table.Head>
              <th>PMID</th>
              <th>Impact Description</th>
            </Table.Head>
            <Table.Body translate="no">
              {variant.impact_sentences.map((impactSentence, i) => (
                <Table.Row isOdd={Boolean(i % 2)} key={i}>
                  <td>{impactSentence.pmids.join(',')}</td>
                  <td>{impactSentence.sentence}</td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  );
};

type DiseaseInvolvementProps = {
  comments?: DiseaseComment[];
  features?: FeatureDatum[];
  primaryAccession: string;
  includeTitle?: boolean;
};

const DiseaseInvolvementView = ({
  comments,
  features,
  primaryAccession: accession,
  includeTitle = false,
}: DiseaseInvolvementProps) => {
  if (!comments?.length) {
    return null;
  }

  return (
    <>
      {includeTitle && (
        <h3 data-article-id="involvement_in_disease">Involvement in disease</h3>
      )}
      <Tabs>
        <Tab title="UniProt Annotations" id="uniprot-annotations">
          {comments.map((comment, index) => (
            <DiseaseInvolvementEntry
              // eslint-disable-next-line @eslint-react/no-array-index-key
              key={index}
              comment={comment}
              features={features}
              accession={accession}
            />
          ))}
        </Tab>
        <Tab title="AI-powered summaries" id="ai-powered-summaries">
          <AIpoweredSummaries />
        </Tab>
      </Tabs>
    </>
  );
};

export default memo(DiseaseInvolvementView);
