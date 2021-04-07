import { useState, FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Bubble,
  Button,
  PublicationIcon,
  ComputerMappedIcon,
  CitedIcon,
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
  statistics: {
    reviewedProteinCount?: number;
    unreviewedProteinCount?: number;
    computationallyMappedProteinCount?: number;
    communityMappedProteinCount?: number;
  };
  pubmedId: number | string;
};

const Statistics: FC<StatisticsProps> = ({ statistics, pubmedId }) => {
  const {
    reviewedProteinCount = 0,
    unreviewedProteinCount = 0,
    computationallyMappedProteinCount = 0,
  } = statistics;
  const citedCount = reviewedProteinCount + unreviewedProteinCount;
  return (
    <div className="publication__statistics">
      {computationallyMappedProteinCount > 0 && (
        <div className="publication__statistics__item">
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=(computational_pubmed_id:${pubmedId})`,
            }}
          >
            <div>
              <small>Mapped to</small>
            </div>
            <div className="publication__statistics__bubble">
              <Bubble
                colourClass="colour-pastel-blue"
                size="small"
                value={computationallyMappedProteinCount}
              />
              <ComputerMappedIcon width={15} height={15} />
            </div>
          </Link>
        </div>
      )}
      {citedCount > 0 && (
        <div className="publication__statistics__item">
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=(lit_pubmed:${pubmedId})`,
            }}
          >
            <div>
              <small>Cited in</small>
            </div>
            <div className="publication__statistics__bubble">
              <Bubble
                colourClass="colour-pastel-blue"
                size="small"
                value={citedCount}
              />
              <CitedIcon width={15} height={15} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

const LiteratureCitation: FC<{
  data: SetOptional<CitationsAPIModel, 'statistics'>;
  displayAll?: boolean;
}> = ({ data, displayAll, children }) => {
  const { citation, statistics } = data;
  const { title, authors, literatureAbstract } = citation;
  const { pubmedId, journalInfo } = formatCitationData(citation);

  return (
    <article className="publication">
      <div className="publication__columns">
        <div className="publication__columns__main">
          <h5>{title || 'No title available.'}</h5>
          {authors?.length && (
            <Authors authors={authors} limit={displayAll ? +Infinity : 10} />
          )}
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
          <div className="publication__columns__side__item">
            {statistics && pubmedId && (
              <Statistics statistics={statistics} pubmedId={pubmedId} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default LiteratureCitation;
