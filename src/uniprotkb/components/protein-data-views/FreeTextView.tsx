import { Fragment, FC, ReactNode, useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ExternalLink } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import SimilarityView from './SimilarityView';

import { IsoformsContext } from '../../../shared/contexts/Isoforms';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import {
  getEntryPath,
  getEntryPathFor,
  allEntryPages,
} from '../../../app/config/urls';
import {
  getTextProcessingParts,
  reAC,
  reIsoform,
  reUniProtKBAccession,
  reSubscript,
  reSuperscript,
  rePubMedCapture,
  reDbSnpCapture,
} from '../../utils/regexes';
import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';

import { Namespace } from '../../../shared/types/namespaces';
import {
  FreeTextComment,
  FreeTextType,
  TextWithEvidence,
} from '../../types/commentTypes';

const needsNewLineRE = /^\)\.\s+/;

const getEntryPathForCitation = getEntryPathFor(Namespace.citations);

type RichTextProps = {
  /**
   * Text to parse and enrich
   */
  children?: string;
  /**
   * Wether to add periods (if missing) at the end. To be used if it's meant to
   * be a sentence
   */
  addPeriod?: boolean;
  /**
   * Just do enrichments that don't involve adding links. Only the visual ones
   */
  noLink?: boolean;
};

export const RichText = ({ children, addPeriod, noLink }: RichTextProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  const isoforms = useContext(IsoformsContext);

  return (
    <>
      {getTextProcessingParts(children)?.map((part, index, mappedArr) => {
        if (!noLink) {
          const pubMedMatch = part.match(rePubMedCapture);
          if (pubMedMatch?.groups) {
            // PubMed ID, insert a link
            // eg A0A075B6S6
            const { pmid } = pubMedMatch.groups;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                PubMed:<Link to={getEntryPathForCitation(pmid)}>{pmid}</Link>
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
          const isoformMatch = part.match(reIsoform)?.[0];
          if (isoformMatch) {
            const [text, isoform] = isoformMatch.split(' ');
            if (
              (isoforms && isoforms.includes(isoform)) ||
              isoform.match(/[A-Z0-9]+-\d+/i)
            ) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  {text}{' '}
                  {/* eslint-disable-next-line uniprot-website/use-config-location */}
                  <Link to={{ hash: `Isoform_${isoform}` }}>{isoform}</Link>
                </Fragment>
              );
            }
          }
          const dbSnpMatch = part.match(reDbSnpCapture);
          if (dbSnpMatch?.groups) {
            const { rsid } = dbSnpMatch.groups;
            return (
              <Fragment key={rsid}>
                dbSNP:
                <ExternalLink
                  url={getUrlFromDatabaseInfo(databaseInfoMaps, 'dbSNP', {
                    id: rsid,
                  })}
                >
                  {rsid}
                </ExternalLink>
              </Fragment>
            );
          }
        }
        if (reSubscript.test(part)) {
          // Exceptional case to handle scientific notations present in kinetic specific constants. Example: 5.38x10(2) has be to superscript
          if (mappedArr[index - 1].endsWith('x10')) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <sup key={index}>{part.substring(1, part.length - 1)}</sup>
            );
          }
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
        if (
          addPeriod &&
          index + 1 === mappedArr.length &&
          !part.endsWith('.')
        ) {
          return `${part}.`;
        }
        // use plain text as such
        return part;
      })}
    </>
  );
};

type TextViewProps = {
  comments: TextWithEvidence[];
  type?: FreeTextType;
  children?: ReactNode;
};

export const TextView = ({ comments, type, children }: TextViewProps) => (
  <div className="text-block">
    {children}
    {comments.map((comment, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {type && type === 'SIMILARITY' ? (
          <SimilarityView>{comment.value}</SimilarityView>
        ) : (
          <RichText addPeriod>{comment.value}</RichText>
        )}
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

const FreeTextView: FC<React.PropsWithChildren<FreeTextProps>> = ({
  comments,
  title,
  articleId,
  showMolecule = true,
}) => {
  const entryPageMatch = useRouteMatch(allEntryPages);

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
              {!entryPageMatch ? (
                `${item.molecule}`
              ) : (
                <a href={`#${item.molecule.replaceAll(' ', '_')}`}>
                  {item.molecule}
                </a>
              )}
            </h4>
          )}
          <TextView comments={item.texts} type={item.commentType} />
        </Fragment>
      )
  );

  return (
    <>
      {title && <h3 data-article-id={articleId}>{title}</h3>}
      {freeTextData}
    </>
  );
};

export default FreeTextView;
