import { Fragment, FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { XRef } from './XRefView';

import { DiseaseComment } from '../../types/commentTypes';
import { databaseToDatabaseInfo } from '../../config/database';

type DiseaseInvolvementEntryProps = {
  comment: DiseaseComment[][0];
  accession: string;
};

type DiseaseInvolvementProps = {
  comments?: DiseaseComment[];
  primaryAccession: string;
  includeTitle?: boolean;
};

export const DiseaseInvolvementEntry: FC<DiseaseInvolvementEntryProps> = ({
  comment,
  accession,
}) => {
  const { disease, note } = comment;

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
    if (database && id && databaseToDatabaseInfo[database]) {
      infoData.push({
        title: 'See also',
        content: (
          <XRef
            database={database}
            xref={disease.diseaseCrossReference}
            primaryAccession={accession}
          />
        ),
      });
    }
  }
  return (
    <>
      <h3>
        {disease?.diseaseId || <em>No disease ID</em>}
        {disease?.acronym && ` (${disease?.acronym})`}
      </h3>
      <span className="text-block">{evidenceNodes}</span>
      <InfoList infoData={infoData} />
    </>
  );
};

export const DiseaseInvolvementView: FC<DiseaseInvolvementProps> = ({
  comments,
  primaryAccession: accession,
  includeTitle = false,
}) => {
  if (!comments?.length) {
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
