import { useState, FC, ReactNode, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Bubble,
  Button,
  PublicationIcon,
  ComputerMappedIcon,
  CitedIcon,
  ExternalLink,
} from 'franklin-sites';

import { Location, LocationToPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

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
    <section className="publication__authors">
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
    </section>
  );
};

type AbstractProps = {
  abstract: string;
  open?: boolean;
};

const Abstract: FC<AbstractProps> = ({ abstract, open = false }) => {
  const [display, setDisplay] = useState(open);
  return (
    <section className="publication__abstract">
      {display ? (
        <p>{abstract}</p>
      ) : (
        <Button variant="tertiary" onClick={() => setDisplay(true)}>
          View abstract [...]
        </Button>
      )}
    </section>
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
        <time dateTime={new Date(publicationDate).toISOString()}>
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
    <section className="publication__statistics">
      {computationallyMappedProteinCount > 0 && (
        <section className="publication__statistics__item">
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=(computational_pubmed_id:${pubmedId})`,
            }}
          >
            <section>
              <small>Mapped to</small>
            </section>
            <section className="publication__statistics__bubble">
              <Bubble
                colourClass="colour-pastel-blue"
                size="small"
                value={computationallyMappedProteinCount}
              />
              <ComputerMappedIcon width={15} height={15} />
            </section>
          </Link>
        </section>
      )}
      {citedCount > 0 && (
        <section className="publication__statistics__item">
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=(lit_pubmed:${pubmedId})`,
            }}
          >
            <section>
              <small>Cited in</small>
            </section>
            <section className="publication__statistics__bubble">
              <Bubble
                colourClass="colour-pastel-blue"
                size="small"
                value={citedCount}
              />
              <CitedIcon width={15} height={15} />
            </section>
          </Link>
        </section>
      )}
    </section>
  );
};

type LiteratureCitationProps = {
  /**
   * The publication title.
   */
  title?: string;
  /**
   * The lise of authors. Will be cut off and can be expanded.
   */
  authors?: string[];
  /**
   * The publication abstract (collapsed by default).
   */
  abstract?: string;
  /**
   * Any extra information to display within the main component column
   */
  children?: string | ReactNode;
  /**
   * Information about the journal in which this was published.
   */
  journalInfo?: JournalInfoProps['journalInfo'];
  /**
   * The PubMed identifier
   */
  pubmedId?: number | string;
  /**
   * Number of other entries this publication is cited in
   */
  statistics?: StatisticsProps['statistics'];
  /**
   * Display all authors and abstract by default (useful for publication entry)
   */
  displayAll?: boolean;
};

const LiteratureCitation: FC<LiteratureCitationProps> = ({
  title,
  authors,
  abstract,
  journalInfo,
  children,
  pubmedId,
  statistics,
  displayAll,
}) => (
  <section className="publication">
    <section className="publication__columns">
      <section className="publication__columns__main">
        <h5>{title}</h5>
        {authors?.length && (
          <Authors authors={authors} limit={displayAll ? +Infinity : 10} />
        )}
        {abstract && <Abstract abstract={abstract} open={displayAll} />}
        {children}
      </section>
      <section className="publication__columns__side">
        <section className="publication__columns__side__item">
          {pubmedId && <PublicationIcon width="1.875em" height="2em" />}
          <ul className="no-bullet">
            {pubmedId && (
              <>
                <li>
                  <a
                    href={`//www.ncbi.nlm.nih.gov/pubmed/${pubmedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed
                  </a>
                </li>
                <li>
                  <a
                    href={`//europepmc.org/article/MED/${pubmedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Europe PMC
                  </a>
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
        </section>
        <section className="publication__columns__side__item">
          {statistics && pubmedId && (
            <Statistics statistics={statistics} pubmedId={pubmedId} />
          )}
        </section>
      </section>
    </section>
  </section>
);

export default LiteratureCitation;
