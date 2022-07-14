import { createElement, useState, FC, Fragment, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
  Bubble,
  Button,
  PublicationIcon,
  ComputerMappedIcon,
  CommunityAnnotationIcon,
  SwissProtIcon,
  TremblIcon,
  EllipsisReveal,
} from 'franklin-sites';
import { capitalize } from 'lodash-es';
import { SetOptional } from 'type-fest';

import ExternalLink from '../../../shared/components/ExternalLink';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import parseDate from '../../../shared/utils/parseDate';
import cleanText, {
  cleanTextDefaultOptions,
  getTransformTags,
} from '../../../shared/utils/cleanText';

import {
  CitationsAPIModel,
  CitationType,
  formatCitationData,
} from '../adapters/citationsConverter';
import { Namespace } from '../../../shared/types/namespaces';

import '../../../shared/styles/literature-citation.scss';

type AuthorProps = {
  authors?: string[];
  authoringGroup?: string[];
  limit?: number;
};

const getLinkToAuthor = (author: string) => ({
  pathname: LocationToPath[Location.UniProtKBResults],
  search: `query=lit_author:"${author}"`,
});

const WORM_BREEDERS_GAZETTE_URL = 'http://www.wormbook.org/wli/';
// const ARVO_URL = 'http://iovs.arvojournals.org/article.aspx?articleid=';
const PGR_URL = 'https://www.ebi.ac.uk/~textman/pgr-htdocs/pgr/';

export const getLocatorUrl = (
  locator?: string,
  name?: 'Plant Gene Register' | "Worm Breeder's Gazette" | string
) => {
  if (!locator || !name) {
    return null;
  }
  switch (name) {
    case 'Plant Gene Register':
      return `${PGR_URL}${locator}.html`;
    case "Worm Breeder's Gazette": {
      const regex = /(\d+)\((\d+)\):(\d+)/;
      const matches = locator?.match(regex);
      if (!matches) {
        return null;
      }
      const issue = matches[1];
      const volume = matches[2];
      const page = matches[3];
      return `${WORM_BREEDERS_GAZETTE_URL}wbg${issue}.${volume}p${page}/`;
    }
    default:
      return null;
  }
};

const getChoppedAuthorLists = (authors: string[], limit: number) => {
  const cutoff = Math.max(authors.length, limit);

  const displayedAuthors = authors.slice(0, limit - 1);
  const hiddenAuthors = authors.slice(limit - 1, cutoff - 1);
  const lastAuthor = authors.slice(cutoff - 1);
  return { displayedAuthors, hiddenAuthors, lastAuthor };
};

const Authors: FC<AuthorProps> = ({ authors, authoringGroup, limit = 10 }) => {
  const { displayedAuthors, hiddenAuthors, lastAuthor } = getChoppedAuthorLists(
    authors || [],
    limit
  );

  return (
    <div className="publication__authors">
      {authoringGroup?.map((group, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {index !== 0 && ', '}
          <Link to={getLinkToAuthor(group)}>{group}</Link>
        </Fragment>
      ))}
      {displayedAuthors.map((author, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {index !== 0 && ', '}
          <Link to={getLinkToAuthor(author)}>{author}</Link>
        </Fragment>
      ))}
      {hiddenAuthors.length > 0 && (
        <EllipsisReveal>
          {hiddenAuthors.map((author, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              , <Link to={getLinkToAuthor(author)}>{author}</Link>
            </Fragment>
          ))}
        </EllipsisReveal>
      )}
      {lastAuthor.length === 1 && (
        <>
          {', '}
          <Link to={getLinkToAuthor(lastAuthor[0])}>{lastAuthor[0]}</Link>
        </>
      )}
    </div>
  );
};

type AbstractProps = {
  abstract: string;
  open?: boolean;
};

const Abstract: FC<AbstractProps> = ({ abstract, open = false }) => {
  const [display, setDisplay] = useState(open);
  return (
    <div className="publication__abstract">
      <Button variant="tertiary" onClick={() => setDisplay(!display)}>
        {display ? 'Hide' : 'View'} abstract
      </Button>
      {display && (
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: cleanText(abstract, {
              ...cleanTextDefaultOptions,
              transformTags: {
                ...getTransformTags('strong'),
              },
            }),
          }}
        />
      )}
    </div>
  );
};

type JournalInfoProps = {
  journalInfo: {
    publicationDate?: string;
    journal?: string;
    firstPage?: string;
    lastPage?: string;
    volume?: string;
    doiId?: string;
    submissionDatabase?: string;
    citationType?: CitationType;
    locator?: string;
    editors?: string[];
    bookName?: string;
    publisher?: string;
    address?: string;
    patentNumber?: string;
  };
};

export const JournalInfo: FC<JournalInfoProps> = ({
  journalInfo: {
    publicationDate,
    journal,
    firstPage,
    lastPage,
    volume,
    doiId,
    submissionDatabase,
    citationType,
    locator,
    editors,
    bookName,
    publisher,
    address,
    patentNumber,
  },
}) => {
  let name = journal || doiId;

  if (citationType === 'book' && bookName) {
    name =
      editors !== undefined ? `${editors?.join(',')}; ${bookName}` : bookName;
  }

  let page = null;
  if (firstPage) {
    page = firstPage;
    if (lastPage) {
      page += `-${lastPage} `;
    }
  }

  let date;
  if (publicationDate) {
    date = (
      <>
        (
        <time dateTime={parseDate(publicationDate)?.toISOString()}>
          {publicationDate}
        </time>
        )
      </>
    );
  }

  const noDisplayCitationTypes: CitationType[] = [
    'UniProt indexed literatures',
    'journal article',
  ];

  const content = (
    <>
      {citationType && !noDisplayCitationTypes.includes(citationType) && (
        <div className="tiny">{capitalize(citationType)}</div>
      )}
      {name} {volume}
      {volume && page && ':'}
      {page}
      {submissionDatabase && `Submitted to ${submissionDatabase} `}
      {patentNumber && `Patent publication ${patentNumber} `}
      {publisher}
      {publisher && address && ', '}
      {address}
      {date}
    </>
  );

  const url = doiId ? externalUrls.DOI(doiId) : getLocatorUrl(locator, name);

  if (!url) {
    return content;
  }

  return <ExternalLink url={url}>{content}</ExternalLink>;
};

type StatisticsProps = {
  statistics: CitationsAPIModel['statistics'];
  id: number | string;
};

const Statistics: FC<StatisticsProps> = ({ statistics, id }) => {
  const {
    reviewedProteinCount,
    unreviewedProteinCount,
    computationallyMappedProteinCount,
    communityMappedProteinCount,
  } = statistics || {};
  return (
    <div className="publication__statistics">
      {reviewedProteinCount || unreviewedProteinCount ? (
        <div className="publication__statistics__content">
          <small>Cited in</small>
          <div className="publication__statistics__content__body">
            {reviewedProteinCount ? (
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `facets=reviewed:true&query=(lit_citation_id:${id})`,
                }}
                title={`UniProtKB reviewed entries: ${reviewedProteinCount}`}
              >
                <Bubble size="small">{reviewedProteinCount}</Bubble>
                <SwissProtIcon
                  className="publication__statistics__content__body--reviewed"
                  height="1em"
                />
              </Link>
            ) : undefined}
            {unreviewedProteinCount ? (
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `facets=reviewed:false&query=(lit_citation_id:${id})`,
                }}
                title={`UniProtKB unreviewed entries: ${unreviewedProteinCount}`}
              >
                <Bubble size="small">{unreviewedProteinCount}</Bubble>
                <TremblIcon
                  className="publication__statistics__content__body--unreviewed"
                  height="1em"
                />
              </Link>
            ) : undefined}
          </div>
        </div>
      ) : undefined}
      {computationallyMappedProteinCount || communityMappedProteinCount ? (
        <div className="publication__statistics__content">
          <small>Mapped to</small>
          <div className="publication__statistics__content__body">
            {computationallyMappedProteinCount ? (
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  // NOTE: only works for PubMed IDs
                  search: `query=(computational_pubmed_id:${id})`,
                }}
                title={`Computationally mapped entries: ${computationallyMappedProteinCount}`}
              >
                <Bubble size="small">
                  {computationallyMappedProteinCount}
                </Bubble>
                <ComputerMappedIcon height="1em" />
              </Link>
            ) : undefined}
            {communityMappedProteinCount ? (
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  // NOTE: only works for PubMed IDs
                  search: `query=(community_pubmed_id:${id})`,
                }}
                title={`Community mapped entries: ${communityMappedProteinCount}`}
              >
                <Bubble size="small">{communityMappedProteinCount}</Bubble>
                <CommunityAnnotationIcon height="1em" />
              </Link>
            ) : undefined}
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

const LiteratureCitation: FC<
  {
    data: SetOptional<CitationsAPIModel, 'statistics'>;
    displayAll?: boolean;
    headingLevel?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
    linkToEntry?: boolean;
  } & HTMLAttributes<HTMLElement>
> = ({
  data,
  displayAll,
  headingLevel = 'h5',
  children,
  linkToEntry,
  className,
  ...props
}) => {
  const { citation, statistics } = data;
  const { title, authors, literatureAbstract, authoringGroup } = citation;
  const { pubmedId, journalInfo } = formatCitationData(citation);

  const headingContent = title || <em>No title available.</em>;

  const heading = createElement(
    headingLevel,
    {
      className: cn('publication__heading', 'small', {
        'publication__heading--no-title': !title,
      }),
    },
    linkToEntry ? (
      <Link to={getEntryPath(Namespace.citations, citation.id)}>
        {headingContent}
      </Link>
    ) : (
      headingContent
    )
  );

  return (
    <article className={cn(className, 'publication')} {...props}>
      <div className="publication__columns">
        <div className="publication__columns__main">
          {heading}
          <Authors
            authors={authors}
            authoringGroup={authoringGroup}
            limit={displayAll ? +Infinity : 10}
          />
          {literatureAbstract && (
            <Abstract abstract={literatureAbstract} open={displayAll} />
          )}
          {children}
        </div>
        <div className="publication__columns__side">
          <div className="publication__columns__side__item">
            {pubmedId && <PublicationIcon width="1.875em" height="2em" />}
            <ul className="no-bullet">
              {pubmedId && (
                <>
                  <li>
                    <ExternalLink url={externalUrls.PubMed(pubmedId)}>
                      PubMed
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink url={externalUrls.EuropePMC(pubmedId)}>
                      Europe PMC
                    </ExternalLink>
                  </li>
                </>
              )}
              {journalInfo && (
                <li>
                  <small>
                    <JournalInfo journalInfo={journalInfo} />
                  </small>
                </li>
              )}
            </ul>
          </div>
          {statistics && (
            <div className="publication__columns__side__item">
              <Statistics statistics={statistics} id={citation.id} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default LiteratureCitation;
