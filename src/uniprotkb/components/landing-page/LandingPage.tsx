import { Link } from 'react-router-dom';
import {
  ExternalLink,
  LongNumber,
  SwissProtIcon,
  TremblIcon,
} from 'franklin-sites';

import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import useDataApi from '../../../shared/hooks/useDataApi';

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

const LandingPage = () => {
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

  return (
    <div className={styles['landing-page']}>
      <h2 className={styles['landing-page__title']}>UniProtKB</h2>
      <div className={styles['landing-page__content']}>
        <div className={styles.video}>
          <YouTubeEmbed id="yp1O1gDK8oA" title="How to search UniProtKB" />
        </div>
        <p className={styles.summary}>
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
        <div className={styles.statistics}>
          <h4>Statistics</h4>
          <div className={styles['statistics__content']}>
            <div>chart goes here</div>
            <div className={styles['entries-count']}>
              <span>Number of Entries</span>
              <div className={styles['entries-count__content']}>
                <SwissProtIcon
                  width="1.75em"
                  className={styles['reviewed-icon']}
                />
                <div className={styles['entries-count__content__text']}>
                  Reviewed (Swiss-Prot)
                  <br />
                  {numberReviewed && (
                    <LongNumber>{numberReviewed}</LongNumber>
                  )}{' '}
                  entries
                </div>
              </div>
              <div className={styles['entries-count__content']}>
                <TremblIcon
                  width="1.75em"
                  className={styles['unreviewed-icon']}
                />
                <div className={styles['entries-count__content__text']}>
                  Unreviewed (TrEMBL)
                  <br />
                  {numberUnreviewed && (
                    <LongNumber>{numberUnreviewed}</LongNumber>
                  )}{' '}
                  entries
                </div>
              </div>
              <Link
                to={getLocationEntryPath(
                  Location.HelpEntry,
                  'release-statistics'
                )}
              >
                Explore the latest release <big>»</big>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.tutorial}>
          <h4>How to use UniProtKB</h4>
          <div className={styles['tutorial__content']}>
            <YouTubeEmbed id="OwOJmKmc7VM" title="Welcome to UniProt" />
            <YouTubeEmbed
              id="BHu88Sv--mc"
              title="How to explore a UniProt entry"
            />
            <YouTubeEmbed
              id="p4_gGkM-Rfs"
              title="How to download embeddings in UniProt"
            />
            {/* <div className={styles['tutorial__video']}>
              <YouTubeEmbed id="OwOJmKmc7VM" title="Welcome to UniProt" />
            </div>
            <div className={styles['tutorial__title']}>Welcome to UniProt</div>
            <div className={styles['tutorial__video']}>
              <YouTubeEmbed id="BHu88Sv--mc" title="How to explore a UniProt entry" />
            </div>
            <div className={styles['tutorial__title']}>How to explore a UniProt entry</div>
            <div className={styles['tutorial__video']}>
              <YouTubeEmbed id="p4_gGkM-Rfs" title="How to download embeddings in UniProt" />
            </div>
            <div className={styles['tutorial__title']}>How to download embeddings in UniProt</div> */}
          </div>
        </div>
        <div className={styles.download}>
          <h4>Download</h4>
          <span>Reviewed(Swiss-Prot)</span>
          {Object.entries(availableFTPFormats).map(([key, value]) => (
            <ExternalLink
              url={`${ftpUrls.uniprotkb_reviewed}.${value}.gz`}
              key={`reviewed-${key}`}
            >
              {key}
            </ExternalLink>
          ))}
          <span>Unreviewed(TrEMBL)</span>
          {Object.entries(availableFTPFormats).map(([key, value]) => (
            <ExternalLink
              url={`${ftpUrls.uniprotkb_unreviewed}.${value}.gz`}
              key={`unreviewed-${key}`}
            >
              {key}
            </ExternalLink>
          ))}
          <ExternalLink
            url={ftpUrls.uniprotkb}
            className={styles['download__ftp-link']}
          >
            Explore more in FTP
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
