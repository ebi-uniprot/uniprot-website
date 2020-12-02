import React, { Fragment } from 'react';

import { InfoList, ExpandableList } from 'franklin-sites';
import { DiseaseComment } from '../../types/commentTypes';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { databaseToDatabaseInfo } from '../../config/database';
import { XRef } from './XRefView';

type DiseaseInvolvementEntryProps = {
  comment: DiseaseComment[][0];
  accession: string;
};

type DiseaseInvolvementProps = {
  comments?: DiseaseComment[];
  primaryAccession: string;
  includeTitle?: boolean;
};

export const DiseaseInvolvementEntry: React.FC<DiseaseInvolvementEntryProps> = ({
  comment,
  accession,
}) => {
  const { disease, note } = comment;
  if (!disease) {
    return null;
  }
  const {
    diseaseId,
    acronym = '',
    evidences,
    description,
    diseaseCrossReference,
  } = disease;
  if (!diseaseId) {
    return null;
  }
  const infoData = [];

  const evidenceNodes = evidences && (
    <UniProtKBEvidenceTag evidences={evidences} />
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
              <Fragment key={index}>{text.value}</Fragment>
            ))}
          </ExpandableList>
        ),
      });
    }
  }

  if (description) {
    infoData.push({
      title: 'Description',
      content: description,
    });
  }

  if (diseaseCrossReference) {
    const { database, id } = diseaseCrossReference;
    if (database && id && databaseToDatabaseInfo[database]) {
      infoData.push({
        title: 'See also',
        content: (
          <XRef
            database={database}
            xref={diseaseCrossReference}
            primaryAccession={accession}
          />
        ),
      });
    }
  }
  return (
    <>
      <h3>{`${diseaseId} ${acronym && `(${acronym})`}`}</h3>
      <span className="text-block">{evidenceNodes}</span>
      <InfoList infoData={infoData} />
    </>
  );
};

export const DiseaseInvolvementView: React.FC<DiseaseInvolvementProps> = ({
  comments,
  primaryAccession: accession,
  includeTitle = false,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const nodes = comments.map((comment, index) => (
    <DiseaseInvolvementEntry
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      comment={comment}
      accession={accession}
    />
  ));
  return (
    <>
      {includeTitle && <h3>Involvement in disease</h3>}
      {nodes}
    </>
  );
};

export default DiseaseInvolvementView;
