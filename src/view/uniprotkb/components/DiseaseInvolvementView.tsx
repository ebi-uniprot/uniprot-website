import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList, ExpandableList } from 'franklin-sites';
import { DiseaseComment } from '../../../model/types/CommentTypes';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { databaseToDatabaseInfo } from '../../../data/database';
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
    <UniProtEvidenceTag evidences={evidences} />
  );

  if (note) {
    const { texts } = note;
    if (texts) {
      infoData.push({
        title: 'Note',
        content: (
          <ExpandableList descriptionString="notes">
            {texts.map(text => ({
              id: v1(),
              content: text.value,
            }))}
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
    <Fragment>
      <h3>{`${diseaseId} ${acronym && `(${acronym})`}`}</h3>
      <span className="text-block">{evidenceNodes}</span>
      <InfoList infoData={infoData} />
    </Fragment>
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
  const nodes = comments.map(comment => (
    <DiseaseInvolvementEntry
      key={v1()}
      comment={comment}
      accession={accession}
    />
  ));
  return (
    <Fragment>
      {includeTitle && <h3>Involvement in disease</h3>}
      {nodes}
    </Fragment>
  );
};

export default DiseaseInvolvementView;
