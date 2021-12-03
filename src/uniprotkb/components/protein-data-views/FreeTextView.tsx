import { Fragment, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import { getEntryPathFor } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { FreeTextComment, TextWithEvidence } from '../../types/commentTypes';

import helper from '../../../shared/styles/helper.module.scss';

const pubMedIDRE = /\d{7,8}/;
// Capturing group will allow split to conserve that bit in the split parts
/** NOTE:
 * Should be using a lookbehind `/(?<=pubmed:)(\d{7,8})/i` but it is not
 * supported in Safari yet. It's OK, we just get more chunks when splitting */
const pubMedRE = /(pubmed:)(\d{7,8})/i;
const needsNewLineRE = /^\).\s+/;

const getEntryPathForCitation = getEntryPathFor(Namespace.citations);

type TextViewProps = { comments: TextWithEvidence[]; noEvidence?: boolean };

export const TextView = ({ comments, noEvidence }: TextViewProps) => (
  <div className="text-block">
    {comments.map((comment, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {comment.value.split(pubMedRE).map((part, index, { length }) => {
          /** We should get odds plain text, and evens pubmed ID, but we are
           *  still double-checking just in case */
          if (pubMedIDRE.test(part)) {
            // PubMed ID, insert a link
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Link key={index} to={getEntryPathForCitation(part)}>
                {part}
              </Link>
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
