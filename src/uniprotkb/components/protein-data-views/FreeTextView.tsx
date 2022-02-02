import { Fragment, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import {
  getEntryPath,
  getEntryPathFor,
  LocationToPath,
  Location,
} from '../../../app/config/urls';
import {
  reAC,
  needTextProcessingRE,
  rePubMedID,
  rePubMed,
  reUniProtKBAccession,
  reFamily,
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
        {comment.value
          .split(needTextProcessingRE)
          .map((part, index, { length }) => {
            // Capturing group will allow split to conserve that bit in the split parts
            // NOTE: rePubMed and reAC should be using a lookbehind eg `/(?<=pubmed:)(\d{7,8})/i` but
            // it is not supported in Safari yet. It's OK, we just get more chunks when splitting
            const pubMedID = part.match(rePubMedID)?.[0];
            if (rePubMed.test(part) && pubMedID) {
              // PubMed ID, insert a link
              // eg A0A075B6S6
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  PubMed:
                  <Link to={getEntryPathForCitation(pubMedID)}>{pubMedID}</Link>
                </Fragment>
              );
            }
            const accession = part.match(reUniProtKBAccession)?.[0];
            if (reAC.test(part) && accession) {
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
            if (reFamily.test(part)) {
              const family = part.replace('Belongs to the ', '');
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  Belongs to the{' '}
                  <Link
                    to={{
                      pathname: LocationToPath[Location.UniProtKBResults],
                      search: `query=(family:"${family}")`,
                    }}
                  >
                    {family}
                  </Link>
                </Fragment>
              );
            }
            // On blocks starting with "). " replace the whitespaces with <br />
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
  articleId?: string;
  showMolecule?: boolean;
  noEvidence?: boolean;
};

const FreeTextView: FC<FreeTextProps> = ({
  comments,
  title,
  articleId,
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
      {title && (
        <h3 className={helper.capitalize} data-article-id={articleId}>
          {title}
        </h3>
      )}
      {freeTextData}
    </>
  );
};

export default FreeTextView;
