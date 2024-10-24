import { Fragment, memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { InfoList, ExpandableList } from 'franklin-sites';
import { escapeRegExp } from 'lodash-es';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { XRef } from './XRefView';
import ExternalLink from '../../../shared/components/ExternalLink';
import { RichText } from './FreeTextView';
import Table from '../../../shared/components/table/Table';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { allEntryPages, getEntryPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import { DiseaseComment } from '../../types/commentTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { FeatureDatum } from './UniProtKBFeaturesView';

import styles from './styles/disease-involvement-view.module.scss';
import variationViewerStyles from '../entry/tabs/variation-viewer/styles/variation-viewer.module.scss';

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
  <Table expandable>
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
          // eslint-disable-next-line react/no-array-index-key
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
          // eslint-disable-next-line react/no-array-index-key
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
