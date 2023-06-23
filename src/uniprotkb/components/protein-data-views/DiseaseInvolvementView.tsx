import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { InfoList, ExpandableList } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { XRef } from './XRefView';
import DatatableWithToggle from '../../../shared/components/views/DatatableWithToggle';
import ExternalLink from '../../../shared/components/ExternalLink';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { getEntryPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import { DiseaseComment } from '../../types/commentTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { FeatureDatum } from './UniProtKBFeaturesView';

import styles from './styles/variation-view.module.scss';

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

export const uniprotVariantLink = (variant: FeatureDatum) =>
  variant.alternativeSequence?.originalSequence ||
  variant.alternativeSequence?.alternativeSequences?.[0] ? (
    <ExternalLink url={externalUrls.UniProt(variant.featureId || '')} noIcon>
      {variant.alternativeSequence?.originalSequence || <em>missing</em>}
      {'>'}
      {variant.alternativeSequence?.alternativeSequences?.[0] || (
        <em>missing</em>
      )}
    </ExternalLink>
  ) : (
    <em>missing</em>
  );

export const DiseaseVariants = ({
  variants,
  accession,
}: {
  variants: FeatureDatum[];
  accession: string;
}) => {
  const table = (
    <table>
      <thead>
        <tr>
          <th>Variant ID</th>
          <th>Position(s)</th>
          <th>Change</th>
          <th>Description</th>
          <th aria-label="protvar-link" />
        </tr>
      </thead>
      <tbody>
        {variants.map((variant, i) => {
          let position = `${variant.location.start.value}`;
          if (variant.location.start.value !== variant.location.end.value) {
            position += `-${variant.location.end.value}`;
          }

          let { description } = variant;
          let rsIDs: string[] | undefined = [];

          const dbSNPRegEx = /dbsnp:rs\d*/gi;
          if (description && dbSNPRegEx.test(description)) {
            const matches = description.match(dbSNPRegEx);
            rsIDs = matches?.map((match) => {
              const [, rsId] = match.split(/dbsnp:/i);
              return rsId;
            });
            [description] = description.split(dbSNPRegEx).filter(Boolean);
          }

          if (variant.location.sequence) {
            description = `In isoform ${variant.location.sequence}; ${description}`;
          }

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              <tr>
                <td>{variant.featureId}</td>
                <td>{position}</td>
                <td className={styles.change}>{uniprotVariantLink(variant)}</td>
                <td>
                  {description}
                  {rsIDs?.map((rsID) => (
                    <ExternalLink url={externalUrls.dbSNP(rsID)} key={rsID}>
                      dbSNP:{rsID}
                    </ExternalLink>
                  ))}
                  {variant.evidences && (
                    <UniProtKBEvidenceTag evidences={variant.evidences} />
                  )}
                </td>
                <td>
                  {variant.alternativeSequence?.originalSequence?.length ===
                    1 &&
                    variant.alternativeSequence?.alternativeSequences
                      ?.length === 1 &&
                    variant.alternativeSequence?.alternativeSequences[0]
                      .length === 1 && (
                      <ExternalLink
                        url={externalUrls.ProtVar(
                          `${accession} ${variant.alternativeSequence.originalSequence}${variant.location.start.value}${variant.alternativeSequence?.alternativeSequences[0]}`
                        )}
                      >
                        ProtVar
                      </ExternalLink>
                    )}
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );

  return <DatatableWithToggle>{table}</DatatableWithToggle>;
};

const reDiseaseAcronymSentence = /^in [^;]+(;|$)/i;

type DiseaseInvolvementEntryProps = {
  comment: DiseaseComment;
  features?: FeatureDatum[];
  accession: string;
};

export const DiseaseInvolvementEntry = ({
  comment,
  features,
  accession,
}: DiseaseInvolvementEntryProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  const { disease, note } = comment;

  if (!disease && !note) {
    return null;
  }

  const diseaseRE =
    disease?.acronym && new RegExp(` ${disease.acronym}(;|,| |$)`);

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

  const evidenceNodes = disease?.evidences && (
    <UniProtKBEvidenceTag evidences={disease.evidences} />
  );

  if (note) {
    const { texts } = note;
    if (texts) {
      infoData.push({
        title: 'Note',
        content: (
          <ExpandableList descriptionString="notes">
            {texts.map((text, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {text.value}
                {text.evidences && (
                  <UniProtKBEvidenceTag evidences={text.evidences} />
                )}
              </Fragment>
            ))}
          </ExpandableList>
        ),
      });
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
      <span className="text-block">{evidenceNodes}</span>
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

type DiseaseInvolvementProps = {
  comments?: DiseaseComment[];
  features?: FeatureDatum[];
  primaryAccession: string;
  includeTitle?: boolean;
};

export const DiseaseInvolvementView = ({
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
      {comments.map((comment, index) => (
        <DiseaseInvolvementEntry
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          comment={comment}
          features={features}
          accession={accession}
        />
      ))}
    </>
  );
};

export default memo(DiseaseInvolvementView);
