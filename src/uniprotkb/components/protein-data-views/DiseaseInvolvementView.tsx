import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { InfoList, ExpandableList } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { XRef } from './XRefView';
import DatatableWithToggle from '../../../shared/components/views/DatatableWithToggle';

import useCustomElement from '../../../shared/hooks/useCustomElement';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { getEntryPath } from '../../../app/config/urls';

import { DiseaseComment } from '../../types/commentTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { FeatureDatum } from './UniProtKBFeaturesView';

import styles from './styles/variation-view.module.scss';

export const DiseaseVariants = ({ variants }: { variants: FeatureDatum[] }) => {
  const dataTableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const table = (
    <table>
      <thead>
        <tr>
          <th>Variant ID</th>
          <th>Position(s)</th>
          <th>Change</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant, i) => {
          let position = `${variant.location.start.value}`;
          if (variant.location.start.value !== variant.location.end.value) {
            position += `-${variant.location.end.value}`;
          }

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              <tr>
                <td>{variant.featureId}</td>
                <td>{position}</td>
                <td className={styles.change}>
                  {variant.alternativeSequence?.originalSequence ||
                  variant.alternativeSequence?.alternativeSequences?.[0] ? (
                    <>
                      {variant.alternativeSequence?.originalSequence || (
                        <em>missing</em>
                      )}
                      {'>'}
                      {variant.alternativeSequence
                        ?.alternativeSequences?.[0] || <em>missing</em>}
                    </>
                  ) : (
                    <em>missing</em>
                  )}
                </td>
                <td>
                  {variant.description}
                  {variant.evidences && (
                    <UniProtKBEvidenceTag evidences={variant.evidences} />
                  )}
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );

  return <DatatableWithToggle table={table} />;
};

type DiseaseInvolvementEntryProps = {
  comment: DiseaseComment;
  accession: string;
};

export const DiseaseInvolvementEntry = ({
  comment,
  accession,
}: DiseaseInvolvementEntryProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  const { disease, note, variants } = comment;

  if (!disease && !note) {
    return null;
  }

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

  const variantList = Object.values(variants || {});

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
      {variantList?.length ? (
        <>
          <h5>Natural variants in {disease?.acronym}</h5>
          <DiseaseVariants variants={variantList} />
        </>
      ) : null}
    </>
  );
};

type DiseaseInvolvementProps = {
  comments?: DiseaseComment[];
  primaryAccession: string;
  includeTitle?: boolean;
};

export const DiseaseInvolvementView = ({
  comments,
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
          accession={accession}
        />
      ))}
    </>
  );
};

export default DiseaseInvolvementView;
