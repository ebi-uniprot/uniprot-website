import {
  AiAnnotationsIcon,
  Button,
  Card,
  Chip,
  ExpandableList,
  InfoList,
  Loader,
  Tab,
  Tabs,
} from 'franklin-sites';
import { escapeRegExp } from 'lodash-es';
import { Fragment, memo, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { allEntryPages, getEntryPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import { MIN_ROWS_TO_EXPAND } from '../../../shared/components/table/constants';
import Table from '../../../shared/components/table/Table';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { Namespace } from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import { type CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import { type DiseaseComment } from '../../types/commentTypes';
import type { Variant, VariantAISummary } from '../../types/variantAISummary';
import variationViewerStyles from '../entry/tabs/variation-viewer/styles/variation-viewer.module.scss';
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

const PmidSummary = ({ pmid, summary }: { pmid: number; summary?: string }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const citationData = useDataApi<SearchResults<CitationsAPIModel>>(
    hasOpened
      ? apiUrls.search.search({
          namespace: Namespace.citations,
          query: `${pmid}`,
        })
      : undefined
  );
  const citationTitle = citationData.data?.results?.[0]?.citation.title;

  if (!summary) {
    return <>{pmid}</>;
  }

  return (
    <>
      <button
        type="button"
        className={styles['pmid-button']}
        onClick={() => {
          setHasOpened(true);
          dialogRef.current?.showModal();
        }}
      >
        {pmid}
      </button>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        className={styles['pmid-dialog']}
        // A backdrop click lands on the dialog element itself, same as a
        // click on its own padding (target === dialog either way) — so
        // compare against its content box instead of just the target, or
        // clicking inside that padding would incorrectly close it.
        onClick={(event) => {
          const rect = dialogRef.current?.getBoundingClientRect();
          if (!rect) {
            return;
          }
          const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
          if (!clickedInside) {
            dialogRef.current?.close();
          }
        }}
      >
        <h6 className={styles['pmid-dialog-heading']}>
          Abstract summary
          <AiAnnotationsIcon
            className="ai-annotation-marker"
            aria-hidden="true"
          />
        </h6>
        <p className={styles['pmid-dialog-meta']}>
          <ExternalLink url={externalUrls.PubMed(pmid)}>
            PMID:{pmid}
          </ExternalLink>
          {citationTitle && ` · ${citationTitle}`}
        </p>
        <p>{summary}</p>
        <div className={styles['pmid-dialog-footer']}>
          <Button variant="tertiary" onClick={() => dialogRef.current?.close()}>
            Close
          </Button>
        </div>
      </dialog>
    </>
  );
};

const AIpoweredSummaries = ({ accession }: { accession: string }) => {
  const variantsData = useDataApi<VariantAISummary>(
    apiUrls.proteinsApi.variantSummary(accession)
  );

  if (variantsData.loading) {
    return <Loader />;
  }

  if (!variantsData.loading && variantsData.data) {
    const { variants } = variantsData.data;
    return (
      <div>
        {variants.map((variant: Variant) => {
          const sentencesByPmid = new Map<number, string[]>();
          for (const impactSentence of variant.impact_sentences) {
            for (const pmid of impactSentence.pmids) {
              const sentences = sentencesByPmid.get(pmid) || [];
              sentences.push(impactSentence.sentence);
              sentencesByPmid.set(pmid, sentences);
            }
          }
          const pmidGroups = Array.from(sentencesByPmid.entries());
          let rowIndex = 0;

          return (
            <Card
              key={variant.variant_name}
              className={styles['variant-card']}
              header={
                <h4 className={styles['variant-name']}>
                  {variant.variant_name}
                </h4>
              }
            >
              <h5>Synthesis Summary</h5>
              <p>
                {variant.synthesis_summary.summary} (PMIDs:{' '}
                {variant.synthesis_summary.pmids.join(', ')})
              </p>
              <Table expandable={pmidGroups.length > MIN_ROWS_TO_EXPAND}>
                <Table.Head>
                  <th>PMID</th>
                  <th>Impact Description</th>
                </Table.Head>
                <Table.Body translate="no">
                  {pmidGroups.flatMap(([pmid, sentences]) => {
                    const abstractSummary = variant.abstract_summaries.find(
                      (summary) => summary.pmid === pmid
                    );
                    return sentences.map((sentence, sentenceIndex) => {
                      const isOdd = Boolean(rowIndex % 2);
                      rowIndex += 1;
                      return (
                        <Table.Row
                          isOdd={isOdd}
                          // eslint-disable-next-line @eslint-react/no-array-index-key
                          key={`${pmid}-${sentenceIndex}`}
                        >
                          <td className={styles['pmid-cell']}>
                            {sentenceIndex === 0 && (
                              <PmidSummary
                                pmid={pmid}
                                summary={abstractSummary?.summary}
                              />
                            )}
                          </td>
                          <td>{sentence}</td>
                        </Table.Row>
                      );
                    });
                  })}
                </Table.Body>
              </Table>
            </Card>
          );
        })}
      </div>
    );
  }
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
        <Tab
          title={
            <>
              AI-powered summaries
              <AiAnnotationsIcon
                className="ai-annotation-marker"
                aria-hidden="true"
              />{' '}
              <Chip compact asSpan>
                New
              </Chip>
            </>
          }
          id="ai-powered-summaries"
          className={styles['ai-tab']}
        >
          <AIpoweredSummaries accession={accession} />
        </Tab>
      </Tabs>
    </>
  );
};

export default memo(DiseaseInvolvementView);
