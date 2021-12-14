import { Fragment, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import { getEntryPath, getEntryPathFor } from '../../../app/config/urls';
import {
  acRE,
  pubMedIDRE,
  pubMedOrACRE,
  pubMedRE,
  uniProtKBAccessionRE,
} from '../../utils';

import { Namespace } from '../../../shared/types/namespaces';
import { FreeTextComment, TextWithEvidence } from '../../types/commentTypes';

import helper from '../../../shared/styles/helper.module.scss';

const needsNewLineRE = /^\).\s+/;

const getEntryPathForCitation = getEntryPathFor(Namespace.citations);

type TextViewProps = { comments: TextWithEvidence[]; noEvidence?: boolean };

export const TextView = ({ comments, noEvidence }: TextViewProps) => (
  <div className="text-block">
    {comments.map((comment, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {comment.value.split(pubMedOrACRE).map((part, index, { length }) => {
          // Capturing group will allow split to conserve that bit in the split parts
          // NOTE: pubMedRE and acRE should be using a lookbehind eg `/(?<=pubmed:)(\d{7,8})/i` but
          // it is not supported in Safari yet. It's OK, we just get more chunks when splitting
          const pubMedID = part.match(pubMedIDRE)?.[0];
          if (pubMedRE.test(part) && pubMedID) {
            // PubMed ID, insert a link
            // eg P05067
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                PubMed:
                <Link to={getEntryPathForCitation(pubMedID)}>{pubMedID}</Link>
              </Fragment>
            );
          }
          const accession = part.match(uniProtKBAccessionRE)?.[0];
          if (acRE.test(part) && accession) {
            // Replace any occurrences of "AC <accession>" with "AC "<link to accession>
            // eg A0A075B6S6
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {`AC `}
                <Link to={getEntryPath(Namespace.uniprotkb, accession)}>
                  {accession}
                </Link>
              </Fragment>
            );
          }
          if (needsNewLineRE.test(part)) {
            // add new line before adding the rest of the plain text
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                ).
                <br />
                {part.replace(needsNewLineRE, '')}
              </Fragment>
            );
          }
          // If the last section doesn't end with a period, add it
          if (index + 1 === length && !part.endsWith('.')) {
            return `${part}.`;
          }
          // use plain text as such
          return part;
        })}
        {!noEvidence && comment.evidences && (
          <UniProtKBEvidenceTag evidences={comment.evidences} />
        )}
      </Fragment>
    ))}
  </div>
);

type FreeTextProps = {
  comments?: FreeTextComment[];
  title?: ReactNode;
  showMolecule?: boolean;
  noEvidence?: boolean;
};

const FreeTextView: FC<FreeTextProps> = ({
  comments,
  title,
  showMolecule = true,
  noEvidence,
}) => {
  if (!comments?.length) {
    return null;
  }
  const freeTextData = comments.map(
    (item, index) =>
      item.texts && (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {showMolecule && item.molecule && (
            <h4 className="tiny">
              {noEvidence ? (
                `${item.molecule}`
              ) : (
                <a href={`#${item.molecule.replaceAll(' ', '_')}`}>
                  {item.molecule}
                </a>
              )}
            </h4>
          )}
          <TextView comments={item.texts} noEvidence={noEvidence} />
        </Fragment>
      )
  );

  return (
    <>
      {title && <h3 className={helper.capitalize}>{title}</h3>}
      {freeTextData}
    </>
  );
};

export default FreeTextView;
