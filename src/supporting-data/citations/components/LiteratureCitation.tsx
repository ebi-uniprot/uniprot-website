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
  ExternalLink,
} from 'franklin-sites';
import { SetOptional } from 'type-fest';

import { Location, LocationToPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import parseDate from '../../../shared/utils/parseDate';

import {
  CitationsAPIModel,
  formatCitationData,
} from '../adapters/citationsConverter';

import '../../../shared/styles/literature-citation.scss';

type AuthorProps = {
  authors: string[];
  limit?: number;
};

const getLinkToAuthor = (author: string) => ({
  pathname: LocationToPath[Location.UniProtKBResults],
  search: `query=lit_author:"${author}"`,
});

const Authors: FC<AuthorProps> = ({ authors, limit = 10 }) => {
  const tooMany = authors.length > limit;

  const [collapsed, setCollapsed] = useState(tooMany);

  const lastAuthor = authors[authors.length - 1];
  const displayedAuthors = collapsed ? authors.slice(0, limit - 1) : authors;

  return (
    <div className="publication__authors">
      {displayedAuthors.map((author, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {index !== 0 && ', '}
          <Link to={getLinkToAuthor(author)}>{author}</Link>
        </Fragment>
      ))}
      {collapsed ? (
        <>
          <Button variant="tertiary" onClick={() => setCollapsed(false)}>
            [...]
          </Button>
          {', '}
          <Link to={getLinkToAuthor(lastAuthor)}>{lastAuthor}</Link>
        </>
      ) : null}
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
      {display ? (
        <p>{abstract}</p>
      ) : (
        <Button variant="tertiary" onClick={() => setDisplay(true)}>
          View abstract [...]
        </Button>
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
  };
};

export const JournalInfo: FC<JournalInfoProps> = ({
  journalInfo: { publicationDate, journal, firstPage, lastPage, volume, doiId },
}) => {
  const name = journal || doiId;
  let page = null;
  if (firstPage) {
    page = firstPage;
    if (lastPage) {
      page += `-${lastPage}`;
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

  const content = (
    <>
      {name} {volume}
      {volume && page && ':'}
      {page}
      {date}
    </>
  );

  if (!doiId) {
    return content;
  }

  return <ExternalLink url={externalUrls.DOI(doiId)}>{content}</ExternalLink>;
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
    <>
      <small>Mapped to</small>
      <div className="publication__statistics">
        {reviewedProteinCount ? (
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `facets=reviewed:true&query=(lit_citation_id:${id})`,
            }}
            title={`UniProtKB reviewed entries: ${reviewedProteinCount}`}
          >
            <Bubble
              colourClass="colour-pastel-blue"
              size="small"
              value={reviewedProteinCount}
            />
            <SwissProtIcon
              className="publication__statistics--reviewed"
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
            <Bubble
              colourClass="colour-pastel-blue"
              size="small"
              value={unreviewedProteinCount}
            />
            <TremblIcon
              className="publication__statistics--unreviewed"
              height="1em"
            />
          </Link>
        ) : undefined}
        {computationallyMappedProteinCount ? (
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              // NOTE: only works for PubMed IDs
              search: `query=(computational_pubmed_id:${id})`,
            }}
            title={`Computationally mapped entries: ${computationallyMappedProteinCount}`}
          >
            <Bubble
              colourClass="colour-pastel-blue"
              size="small"
              value={computationallyMappedProteinCount}
            />
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
            <Bubble
              colourClass="colour-pastel-blue"
              size="small"
              value={communityMappedProteinCount}
            />
            <CommunityAnnotationIcon height="1em" />
          </Link>
        ) : undefined}
      </div>
    </>
  );
};

const LiteratureCitation: FC<
  {
    data: SetOptional<CitationsAPIModel, 'statistics'>;
    displayAll?: boolean;
    headingLevel?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
  } & HTMLAttributes<HTMLElement>
> = ({
  data,
  displayAll,
  headingLevel = 'h5',
  children,
  className,
  ...props
}) => {
  const { citation, statistics } = data;
  const { title, authors, literatureAbstract } = citation;
  const { pubmedId, journalInfo } = formatCitationData(citation);

  return (
    <article className={cn(className, 'publication')} {...props}>
      <div className="publication__columns">
        <div className="publication__columns__main">
          {createElement(
            headingLevel,
            {
              className: cn('publication__heading', 'tiny', {
                'publication__heading--no-title': !title,
              }),
            },
            title || <em>No title available.</em>
          )}
          {authors?.length && (
            <Authors authors={authors} limit={displayAll ? +Infinity : 10} />
          )}
          {literatureAbstract && (
            <Abstract abstract={literatureAbstract} open={displayAll} />
          )}
        </div>
        <div className="publication__columns__side">
          <div className="publication__columns__side__item">
            {pubmedId && <PublicationIcon width="1.875em" height="2em" />}
            <ul className="no-bullet">
              {pubmedId && (
                <>
                  <li>
                    <ExternalLink noIcon url={externalUrls.PubMed(pubmedId)}>
                      PubMed
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink noIcon url={externalUrls.EuropePMC(pubmedId)}>
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
          {children}
        </div>
      </div>
    </article>
  );
};

export default LiteratureCitation;
