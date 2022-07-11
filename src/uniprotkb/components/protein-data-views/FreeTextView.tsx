import { Fragment, FC, ReactNode } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import {
  getEntryPath,
  getEntryPathFor,
  LocationToPath,
  Location,
  allSearchResultLocations,
} from '../../../app/config/urls';
import {
  reAC,
  needTextProcessingRE,
  rePubMedID,
  rePubMed,
  reUniProtKBAccession,
  reFamily,
  familyExtractor,
  reSubscript,
  reSuperscript,
} from '../../utils';

import { Namespace } from '../../../shared/types/namespaces';
import { FreeTextComment, TextWithEvidence } from '../../types/commentTypes';

import helper from '../../../shared/styles/helper.module.scss';

const needsNewLineRE = /^\)\.\s+/;

const getEntryPathForCitation = getEntryPathFor(Namespace.citations);

export const RichText = ({
  children,
  addPeriod,
}: {
  children?: string;
  addPeriod?: boolean;
}) => (
  <>
    {children?.split(needTextProcessingRE).map((part, index, { length }) => {
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
            {/* Somehow the part kept "AC ", so put it back */}
            {part.startsWith('AC ') ? `AC ` : ''}
            <Link to={getEntryPath(Namespace.uniprotkb, accession)}>
              {accession}
            </Link>
          </Fragment>
        );
      }
      if (reFamily.test(part)) {
        return part.split(familyExtractor).map((familyPart) => {
          if (familyPart.endsWith('family')) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Link
                key={familyPart}
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `query=(family:"${familyPart}")`,
                }}
              >
                {familyPart}
              </Link>
            );
          }
          return familyPart;
        });
      }
      if (reSubscript.test(part)) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <sub key={index}>{part.substring(1, part.length - 1)}</sub>
        );
      }
      if (reSuperscript.test(part)) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <sup key={index}>{part.substring(1, part.length - 1)}</sup>
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
      if (addPeriod && index + 1 === length && !part.endsWith('.')) {
        return `${part}.`;
      }
      // use plain text as such
      return part;
    })}
  </>
);

export const TextView = ({ comments }: { comments: TextWithEvidence[] }) => (
  <div className="text-block">
    {comments.map((comment, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        <RichText addPeriod>{comment.value}</RichText>
        <UniProtKBEvidenceTag evidences={comment.evidences} />
      </Fragment>
    ))}
  </div>
);

type FreeTextProps = {
  comments?: FreeTextComment[];
  title?: ReactNode;
  articleId?: string;
  showMolecule?: boolean;
};

const FreeTextView: FC<FreeTextProps> = ({
  comments,
  title,
  articleId,
  showMolecule = true,
}) => {
  const searchPageMath = useRouteMatch(allSearchResultLocations);

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
              {searchPageMath?.isExact ? (
                `${item.molecule}`
              ) : (
                <a href={`#${item.molecule.replaceAll(' ', '_')}`}>
                  {item.molecule}
                </a>
              )}
            </h4>
          )}
          <TextView comments={item.texts} />
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
