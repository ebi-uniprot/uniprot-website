import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  LongNumber,
  SwissProtIcon,
  TremblIcon,
} from 'franklin-sites';
import cn from 'classnames';

import StatisticsChart from './StatisticsChart';

import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import useDataApi from '../../../shared/hooks/useDataApi';
import useUniProtDataVersion from '../../../shared/hooks/useUniProtDataVersion';

import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';
import { getAPIQueryUrl } from '../../../shared/config/apiUrls';
import ftpUrls from '../../../shared/config/ftpUrls';

import { SearchResults } from '../../../shared/types/results';
import { Namespace } from '../../../shared/types/namespaces';

import styles from './styles/landing-page.module.scss';

const availableFTPFormats = {
  fasta: 'fasta',
  text: 'dat',
  xml: 'xml',
};

const tutorialsInfo = [
  {
    id: 'yp1O1gDK8oA',
    title: 'How to search UniProtKB',
    date: new Date('2021-10-26'),
  },
  {
    id: 'BHu88Sv--mc',
    title: 'How to explore a UniProt entry',
    date: new Date('2022-02-17'),
  },
  {
    id: 'p4_gGkM-Rfs',
    title: 'How to download embeddings in UniProt',
    date: new Date('2023-06-25'),
  },
];

const LandingPage = () => {
  const release = useUniProtDataVersion();

  const { data } = useDataApi<SearchResults<never>>(
    getAPIQueryUrl({
      namespace: Namespace.uniprotkb,
      query: '*',
      size: 0,
      facets: ['reviewed'],
    })
  );

  let numberReviewed: undefined | number;
  let numberUnreviewed: undefined | number;

  if (data?.facets?.[0].values?.length) {
    numberReviewed = data?.facets?.[0].values.find(
      (value) => value.value === 'true'
    )?.count;
    numberUnreviewed = data?.facets?.[0].values.find(
      (value) => value.value === 'false'
    )?.count;
  }

  const [reviewedHovered, setReviewedHovered] = useState(false);
  const [unreviewedHovered, setUnreviewedHovered] = useState(false);

  return (
    <div className={styles['landing-page']}>
      <h1 className={styles['landing-page__title']}>UniProtKB</h1>
      <div className={cn('uniprot-grid', styles['landing-page__content'])}>
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-4'
          )}
        >
          <YouTubeEmbed id="OwOJmKmc7VM" title="Welcome to UniProt" />
        </div>
        <p
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-8'
          )}
        >
          The UniProt Knowledgebase (UniProtKB) is the central hub for the
          collection of functional information on proteins, with accurate,
          consistent and rich annotation. In addition to capturing the core data
          mandatory for each UniProtKB entry (mainly, the amino acid sequence,
          protein name or description, taxonomic data and citation information),
          as much annotation information as possible is added. <br />
          <br />
          The UniProt Knowledgebase consists of two sections: a section
          containing manually-annotated records with information extracted from
          literature and curator-evaluated computational analysis
          (UniProtKB/Swiss-Prot), and a section with computationally analyzed
          records that await full manual annotation (UniProtKB/TrEMBL).
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=*`,
            }}
            className={styles['search-link']}
          >
            Start searching in UniProtKB <big>»</big>
          </Link>
        </p>

        {/* Statistics */}
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-9',
            styles.statistics
          )}
        >
          <h2>Statistics</h2>
          <div className={styles.statistics__content}>
            <div className={styles.chart}>
              <h3 className="tiny">
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: `groupBy=taxonomy&query=*`,
                  }}
                >
                  Taxonomic origin
                </Link>
              </h3>

              <StatisticsChart
                releaseNumber={release?.releaseNumber}
                reviewed={!unreviewedHovered}
                unreviewed={!reviewedHovered}
              />
            </div>
            <div className={styles['entries-count']}>
              <h3 className="tiny">Number of Entries</h3>
              <div
                className={styles['entries-count__content']}
                onPointerEnter={() => setReviewedHovered(true)}
                onPointerLeave={() => setReviewedHovered(false)}
              >
                <SwissProtIcon
                  width="1.75em"
                  className={styles['reviewed-icon']}
                />
                <div className={styles['entries-count__content__text']}>
                  Reviewed (Swiss-Prot)
                  <br />
                  {numberReviewed && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniProtKBResults],
                        search: `facets=reviewed:true&query=*`,
                      }}
                    >
                      <LongNumber>{numberReviewed}</LongNumber> entries
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={styles['entries-count__content']}
                onPointerEnter={() => setUnreviewedHovered(true)}
                onPointerLeave={() => setUnreviewedHovered(false)}
              >
                <TremblIcon
                  width="1.75em"
                  className={styles['unreviewed-icon']}
                />
                <div className={styles['entries-count__content__text']}>
                  Unreviewed (TrEMBL)
                  <br />
                  {numberUnreviewed && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniProtKBResults],
                        search: `facets=reviewed:false&query=*`,
                      }}
                    >
                      <LongNumber>{numberUnreviewed}</LongNumber> entries
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  styles['entries-count__content'],
                  styles['statistics-link']
                )}
              >
                <Link
                  to={getLocationEntryPath(
                    Location.HelpEntry,
                    'release-statistics'
                  )}
                >
                  Explore the {release?.releaseNumber} release <big>»</big>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-3',
            styles.download
          )}
        >
          <h2>Download</h2>
          <div className={styles.download__content}>
            <br />
            <div>
              <span>Reviewed (Swiss-Prot)</span>
              {Object.entries(availableFTPFormats).map(([key, value]) => (
                <ExternalLink
                  url={`${ftpUrls.uniprotkb_reviewed}.${value}.gz`}
                  key={`reviewed-${key}`}
                >
                  {key}
                </ExternalLink>
              ))}
            </div>
            <div>
              <span>Unreviewed (TrEMBL)</span>
              {Object.entries(availableFTPFormats).map(([key, value]) => (
                <ExternalLink
                  url={`${ftpUrls.uniprotkb_unreviewed}.${value}.gz`}
                  key={`unreviewed-${key}`}
                >
                  {key}
                </ExternalLink>
              ))}
            </div>
            <div>
              <ExternalLink
                url={ftpUrls.uniprotkb}
                className={styles['download__ftp-link']}
              >
                Explore more in FTP
              </ExternalLink>
            </div>
          </div>
        </div>

        {/* Tutorials */}
        <h2
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-12'
          )}
        >
          How to use UniProtKB
        </h2>
        {tutorialsInfo.map((item) => (
          <Fragment key={item.id}>
            <div
              className={cn(
                'uniprot-grid-cell--small-span-6',
                'uniprot-grid-cell--medium-span-2',
                styles.tutorial
              )}
            >
              <YouTubeEmbed id={item.id} title={item.title} />
            </div>
            <div
              className={cn(
                'uniprot-grid-cell--small-span-6',
                'uniprot-grid-cell--medium-span-2',
                styles.tutorial
              )}
            >
              <div className={styles.tutorial__title} title={item.title}>
                {item.title}
              </div>
              <time dateTime={item.date.toISOString()}>
                {item.date.toDateString()}
              </time>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
